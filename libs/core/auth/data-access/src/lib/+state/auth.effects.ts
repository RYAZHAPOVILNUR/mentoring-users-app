import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from "@users/core/http";
import { authActions } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SignAuthResponse } from "./sign.auth.model";

export const loginEffect = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) => actions$.pipe(
    ofType(authActions.login),
    switchMap(
      ({userData: {email, password}}) => 
        api.post<SignAuthResponse, {email: string; password: string}>('/auth/login', {email, password})
        .pipe(
          map((res) => authActions.loginSuccess({res})),
          catchError(error => of(authActions.loginFailure({error})))
        )
    )
  ), {functional: true}
)
