import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { ChangePasswordPayload, ChangeProfileDataPayload } from '@users/core/data-access-models';

import { AuthStore } from './+state/auth-signal-store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  store = inject(Store);
  signalStore = inject(AuthStore);
  isAuthenticated$ = toObservable(this.signalStore.isAuthenticated);
  user$ = toObservable(this.signalStore.loggedUser);
  isAdmin$ = toObservable(this.signalStore.isAdmin);
  loggedUserId$ = toObservable(this.signalStore.loggedUserId);
  status$ = toObservable(this.signalStore.status);

  public logout() {
    this.signalStore.logout();
  }

  public changePassword(data: ChangePasswordPayload) {
    this.signalStore.changePassword({ data });
  }

  public changeProfileData(userData: ChangeProfileDataPayload) {
    this.signalStore.changeProfileData({ userData });
  }

  public getLoggedUser() {
    return this.user$;
  }
}
