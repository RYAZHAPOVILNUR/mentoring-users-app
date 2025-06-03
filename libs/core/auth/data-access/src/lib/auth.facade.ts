import { inject, Injectable } from '@angular/core';
import { ChangePasswordPayload, ChangeProfileDataPayload } from './+state/sign.auth.model';
import { AuthStore } from './+state/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from './+state/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authSignalStore = inject(AuthStore);
  authService = inject(AuthService);

  isAuthenticated$ = toObservable(this.authSignalStore.isAuthenticated);
  user$ = toObservable(this.authSignalStore.loggedUser);
  isAdmin$ = toObservable(this.authSignalStore.isAdmin);
  loggedUserId$ = toObservable(this.authSignalStore.loggedUserId);
  status$ = toObservable(this.authSignalStore.status);

  public logout() {
    this.authService.logout();
  }

  public changePassword(data: ChangePasswordPayload) {
    this.authService.changePassword(data);
  }

  // public changeProfileData(data: ChangeProfileDataPayload) {
  //   this.store.dispatch(authActions.changeProfileData({ data }));
  // }

  public getLoggedUser() {
    return this.user$;
  }
}
