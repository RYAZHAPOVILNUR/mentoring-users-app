import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from "@users/core/http";
import { authActions } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { LoggedInUser, SignAuthPayload, SignAuthResponse } from "./sign.auth.model";
import { LocalStorageJwtService } from "../services/local-storage-jwt.service";
import { Router } from "@angular/router";

export const loginEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) => actions$.pipe(
    ofType(authActions.login),
    switchMap(
      ({ userData }) =>
        api.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData)
          .pipe(
            map((res) => authActions.loginSuccess({ res })),
            catchError(error => of(authActions.loginFailure({ error })))
          )
    )
  ), { functional: true }
)

export const loginSuccessEffect$ = createEffect(
  (actions$ = inject(Actions),
    localStorageJwtService = inject(LocalStorageJwtService),
    router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.res.authToken);
        router.navigateByUrl('/home')
      })
    )
  }, { functional: true, dispatch: false },
)

export const getUserEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.getUser),
      switchMap(
        () =>
          api.get<LoggedInUser>('/auth/me').pipe(
            map((data) => authActions.getUserSuccess({ user: data })),
            catchError((error) => of(authActions.getUserFailure({ error }))),
          ),
      ),
    );
  },
  { functional: true }
)
