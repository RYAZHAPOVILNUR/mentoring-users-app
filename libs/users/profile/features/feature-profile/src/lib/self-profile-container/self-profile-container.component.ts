import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { UsersEntity } from '@users/core/data-access-models';
import { CropperDialogComponent } from '@users/core/ui';
import { noop, of, tap } from 'rxjs';

import { githubApiActions, GithubApiService, githubSelectors } from '@shared/data-access-github';
import { selectQueryParam } from '@shared/util-store';
import { AuthStore } from '@users/core/data-access-auth';

import { ProfileComponent } from '../feature-user-info/profile.component';

@Component({
  standalone: true,
  imports: [ProfileComponent, LetDirective, CommonModule],
  templateUrl: './self-profile-container.component.html',
  styleUrls: ['./self-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfProfileContainerComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  private readonly dialog = inject(MatDialog);
  private readonly githubApiService = inject(GithubApiService);
  private destroyRef = inject(DestroyRef);

  public readonly user!: UsersEntity;

  public readonly user$ = toObservable(this.authStore.loggedUser);
  public readonly status$ = toObservable(this.authStore.status);
  public readonly githubUserName$ = this.store.select(githubSelectors.selectGithubUserName);
  public readonly githubStatus$ = this.store.select(githubSelectors.selectGithubStatus);
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
          this.authStore.uploadImage({ image: result });
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
