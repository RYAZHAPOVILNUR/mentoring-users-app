import {inject, Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import * as AuthSelectors from './+state/auth.selectors'
import { authActions } from "./+state/auth.actions";

@Injectable({providedIn: "root"})
export class AuthFacade {
  store = inject(Store)
  isAuthenticated$ = this.store.pipe(select(AuthSelectors.selectIsAuthenticated))
  user$ = this.store.pipe(select(AuthSelectors.selectLoggedUser))
  isAdmin$ = this.store.pipe(select(AuthSelectors.selectIsAdmin))

  public logout() {
    this.store.dispatch(authActions.logout())
  }
}
