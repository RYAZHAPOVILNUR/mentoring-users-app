import {inject, Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import * as AuthSelectors from './auth.selectors'
import { authActions } from "./auth.actions";

@Injectable({providedIn: "root"})
export class AuthFacade {
  store = inject(Store)
  isAuthenticated$ = this.store.pipe(select(AuthSelectors.selectIsAuthenticated))
  user$ = this.store.pipe(select(AuthSelectors.selectLoggedUser))

  public logout() {
    this.store.dispatch(authActions.logout())
  }
}
