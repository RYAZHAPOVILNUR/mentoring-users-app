import { inject, Injectable } from '@angular/core';
import { ChangePasswordPayload, ChangeProfileDataPayload } from './+state/sign.auth.model';
import { AuthStore } from './+state/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  readonly authStore = inject(AuthStore);
  isAuthenticated$ = this.authStore.signalIsAuthenticated;
  user$ = this.authStore.loggedUser;
  isAdmin$ = this.authStore.signalIsAdmin;
  loggedUserId$ = this.authStore.signalLoggedUserId;
  status$ = this.authStore.status;

  public logout() {
    this.authStore.logout();
  }

  public changePassword(data: ChangePasswordPayload) {
    this.authStore.changePassword( data );
  }

  public changeProfileData(data: ChangeProfileDataPayload) {
    this.authStore.changeProfileData( data );
  }

  public getLoggedUser() {
    return this.user$;
  }
}
