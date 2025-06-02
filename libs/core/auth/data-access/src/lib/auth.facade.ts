import { inject, Injectable } from '@angular/core';
import { ChangePasswordPayload, ChangeProfileDataPayload } from './+state/sign.auth.model';
import { AuthStore } from './+state/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authStore = inject(AuthStore);

  isAuthenticated$ = toObservable(this.authStore.signalIsAuthenticated);
  user$ = toObservable(this.authStore.loggedUser);
  isAdmin$ = toObservable(this.authStore.signalIsAdmin);
  loggedUserId$ = toObservable(this.authStore.signalLoggedUserId);
  status$ = toObservable(this.authStore.authStatus);

  public logout() {
    this.authStore.logout();
  }

  public changePassword(data: ChangePasswordPayload) {
    this.authStore.changePassword(data);
  }

  // public changeProfileData(data: ChangeProfileDataPayload) {
  //   this.store.dispatch(authActions.changeProfileData({ data }));
  // }

  public getLoggedUser() {
    return this.user$;
  }
}
