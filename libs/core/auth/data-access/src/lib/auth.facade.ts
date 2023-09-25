import { inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as AuthSelectors from './+state/auth.selectors'
import { authActions } from "./+state/auth.actions";
import { ChangeNamePayload, ChangePasswordPayload, ChangeProfileDataPayload } from "./+state/sign.auth.model";

@Injectable({ providedIn: "root" })
export class AuthFacade {
  store = inject(Store)
  isAuthenticated$ = this.store.pipe(select(AuthSelectors.selectIsAuthenticated))
  user$ = this.store.pipe(select(AuthSelectors.selectLoggedUser))
  isAdmin$ = this.store.pipe(select(AuthSelectors.selectIsAdmin))
  loggedUserId$ = this.store.pipe(select(AuthSelectors.selectLoggedUserId))

  public logout() {
    this.store.dispatch(authActions.logout())
  }

  public changePassword(data: ChangePasswordPayload) {
    this.store.dispatch(authActions.changePassword({ data }))
  }

  public changeName(data: ChangeNamePayload) {
    this.store.dispatch(authActions.changeName({ data }))
  }

  public changeProfileData(data: ChangeProfileDataPayload){
    console.log("data", data);
    
    this.store.dispatch(authActions.changeProfileData({ data }));
  }

  public getLoggedUser(){
    return this.user$;
  }
}