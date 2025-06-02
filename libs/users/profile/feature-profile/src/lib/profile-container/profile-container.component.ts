import {
  GithubApiService,
  githubApiActions,
  selectGithubStatus,
  selectGithubUserName,
} from '@users/core/github-api/data-access';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AuthStore } from '@auth/data-access';
import { selectQueryParam } from '@users/core/data-access';
import { FeatureUserInfoComponent } from '../../../../feature-user-info/feature-user-info.component';
import { CropperDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { noop, of, tap } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-container',
  standalone: true,
  imports: [FeatureUserInfoComponent, LetDirective, CommonModule],
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainerComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authSignalStore = inject(AuthStore);
  private destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly githubApiService = inject(GithubApiService);
  public readonly githubUserName$ = this.store.select(selectGithubUserName);
  public readonly githubStatus$ = this.store.select(selectGithubStatus);
  public readonly isLoggedUser = of(true);
  public readonly user$ = toObservable(this.authSignalStore.loggedUser);
  public readonly status$ = toObservable(this.authSignalStore.authStatus);

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
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;

      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: { image },
      });

      dialogRef.afterClosed().subscribe((image) => {
        if (image) {
          this.authSignalStore.uploadImage(image);
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
