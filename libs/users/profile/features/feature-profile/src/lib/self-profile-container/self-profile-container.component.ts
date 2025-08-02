import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, noop, tap } from 'rxjs';

import { githubApiActions, GithubApiService, githubSelectors } from '@shared/data-access-github';
import { CropperDialogService } from '@shared/feature-cropper';
import { selectQueryParam } from '@shared/util-store';
import { AuthStore } from '@users/core/data-access-auth';

import { ProfileComponent } from '../feature-user-info/profile.component';

@Component({
  standalone: true,
  imports: [ProfileComponent, LetDirective, NgIf],
  templateUrl: './self-profile-container.component.html',
  styleUrls: ['./self-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfProfileContainerComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  private readonly destroyRef = inject(DestroyRef);

  private readonly cropperDialogService = inject(CropperDialogService);
  private readonly githubApiService = inject(GithubApiService);

  public readonly status = this.authStore.status;

  public readonly githubUserName$ = this.store.select(githubSelectors.selectGithubUserName);
  public readonly githubStatus$ = this.store.select(githubSelectors.selectGithubStatus);
  public readonly isLoggedUser = this.authStore.isAuthenticated;
  public readonly loggedUser = this.authStore.loggedUser;

  public readonly vm = {
    user: this.loggedUser(),
    githubUserName: this.githubUserName$,
    githubStatus: this.githubStatus$,
    isLoggedUser: this.isLoggedUser(),
  };

  ngOnInit() {
    this.store
      .select(selectQueryParam('code'))
      .pipe(
        tap((code) => {
          if (code && typeof code === 'string') {
            this.store.dispatch(githubApiActions.getAccessToken({ code }));
          }
        }),
        takeUntilDestroyed(this.destroyRef),
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
      // @typescript-eslint/no-non-null-assertion
      const dialogRef = this.cropperDialogService.open({ imageSrc: e.target!.result as string });
      dialogRef
        .afterClosed()
        .pipe(
          filter(Boolean),
          tap((image) => this.authStore.uploadImage({ image })),
        )
        .subscribe();
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
