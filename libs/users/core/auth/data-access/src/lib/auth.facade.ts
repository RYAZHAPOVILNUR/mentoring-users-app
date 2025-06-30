import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { authActions } from './+state/auth.actions';
import * as AuthSelectors from './+state/auth.selectors';
import { ChangePasswordPayload, ChangeProfileDataPayload } from './+state/sign.auth.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  store = inject(Store);
  isAuthenticated$ = this.store.pipe(select(AuthSelectors.selectIsAuthenticated));
  user$ = this.store.pipe(select(AuthSelectors.selectLoggedUser));
  isAdmin$ = this.store.pipe(select(AuthSelectors.selectIsAdmin));
  loggedUserId$ = this.store.pipe(select(AuthSelectors.selectLoggedUserId));
  status$ = this.store.pipe(select(AuthSelectors.selectAuthStatus));

  public logout() {
    this.store.dispatch(authActions.logout());
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
