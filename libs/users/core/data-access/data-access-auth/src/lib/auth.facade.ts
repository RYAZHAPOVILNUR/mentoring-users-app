import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';

import { AuthStore } from './+state/auth-signal-store';
import { authActions } from './+state/auth.actions';
import * as AuthSelectors from './+state/auth.selectors';
import { ChangePasswordPayload, ChangeProfileDataPayload } from './+state/sign.auth.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  store = inject(Store);
  store2 = inject(AuthStore);
  isAuthenticated$ = toObservable(this.store2.isAuthenticated);
  user$ = toObservable(this.store2.loggedUser);
  isAdmin$ = toObservable(this.store2.isAdmin);
  loggedUserId$ = toObservable(this.store2.loggedUserId);
  status$ = toObservable(this.store2.status);

  public logout() {
    this.store2.logout();
  }

  public changePassword(data: ChangePasswordPayload) {
    this.store.dispatch(authActions.changePassword({ data }));
  }

  public changeProfileData(data: ChangeProfileDataPayload) {
    this.store.dispatch(authActions.changeProfileData({ data }));
  }

  public getLoggedUser() {
    return this.user$;
  }
}
