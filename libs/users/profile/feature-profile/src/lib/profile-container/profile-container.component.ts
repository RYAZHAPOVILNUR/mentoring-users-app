import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectQueryParam } from '@shared/util-store';
import { authActions, authSelectors } from '@users/core/data-access-auth';
import { UsersEntity } from '@users/core/data-access-models';
import {
  githubApiActions,
  GithubApiService,
  selectGithubStatus,
  selectGithubUserName,
} from '@users/core/github-api/data-access';
import { CropperDialogComponent } from '@users/core/ui';
import { noop, of, tap } from 'rxjs';

import { FeatureUserInfoComponent } from '../feature-user-info/feature-user-info.component';

@Component({
  standalone: true,
  imports: [FeatureUserInfoComponent, LetDirective, CommonModule],
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainerComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly githubApiService = inject(GithubApiService);
  private destroyRef = inject(DestroyRef);

  public readonly user!: UsersEntity;

  public readonly user$ = this.store.select(authSelectors.selectLoggedUser);
  public readonly status$ = this.store.select(authSelectors.selectAuthStatus);
  public readonly githubUserName$ = this.store.select(selectGithubUserName);
  public readonly githubStatus$ = this.store.select(selectGithubStatus);
  public readonly isLoggedUser = of(true);

  ngOnInit() {
    this.store
      .select(selectQueryParam('code'))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((code) => {
          if (code && typeof code === 'string') {
            this.store.dispatch(githubApiActions.getAccessToken({ code }));
          }
        }),
      )
      .subscribe(noop);

    const ghToken = this.githubApiService.accessToken.value;
    if (ghToken) {
      this.store.dispatch(githubApiActions.getGithubUser({ token: ghToken }));
    }
  }

  public onLoadPhoto(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();

      if (typeof e.target?.result === 'string') {
        image.src = e.target.result;
      }

      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: { image },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.store.dispatch(authActions.uploadImage({ image: result }));
        }
      });
    };
    reader.readAsDataURL(file);
  }

  onConnectGithub() {
    this.githubApiService.loginWithGithub();
  }

  onDisconnectGithub() {
    this.githubApiService.clearStoredAccessToken();
    this.store.dispatch(githubApiActions.logoutFromGithub());
  }
}
