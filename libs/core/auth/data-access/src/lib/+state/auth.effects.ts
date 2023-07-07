import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from "@users/core/http";
import { authActions } from "./auth.actions";
import { catchError, concatMap, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { NewUser, RegisterResponse, SignAuthPayload, SignAuthResponse } from "./sign.auth.model";
import { LocalStorageJwtService } from "../services/local-storage-jwt.service";
import { Router } from "@angular/router";
import { UsersDTO, usersDTOAdapter } from "@users/core/data-access";
import { Store } from "@ngrx/store";
import { selectAuthStatus } from "./auth.selectors";

export const loginEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) => actions$.pipe(
    ofType(authActions.login),
    switchMap(
      ({ userData }) =>
        api.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData)
          .pipe(
            map((res) => {
              const userEntity = usersDTOAdapter.DTOtoEntity(res.user);
              const updatedRes = { ...res, user: userEntity };
              return authActions.loginSuccess({ res: updatedRes });
            }),
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
  (actions$ = inject(Actions),
    api = inject(ApiService),
    localStorageJwtService = inject(LocalStorageJwtService),
    store = inject(Store)) =>
    actions$.pipe(
      ofType(authActions.getUser),
      withLatestFrom(store.select(selectAuthStatus)),
      switchMap(([, authStatus]) =>
        localStorageJwtService.getItem() && authStatus !== 'loaded'
          ? api.get<UsersDTO>('/auth/me').pipe(
              map((userDTO) => authActions.getUserSuccess({ user: usersDTOAdapter.DTOtoEntity(userDTO) })),
              catchError((error) => of(authActions.getUserFailure({ error })))
            )
          : of()
      )
    ),
  { functional: true }
);



export const registerEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(
        ({ userData }) => api.post<RegisterResponse, NewUser>('/auth/signup', userData).pipe(
          map(({ authToken }) => authActions.registerSuccess({ authToken })),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    )
  }, { functional: true }
);

export const registerSuccessEffects$ = createEffect(
  (actions$ = inject(Actions),
    localStorageJwtService = inject(LocalStorageJwtService),
    router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      concatMap((action) => {
        localStorageJwtService.setItem(action.authToken);
        router.navigateByUrl('/home');
        return of(authActions.getUser());
      })
    );
  },
  { functional: true }
);

export const logoutEffect$ = createEffect(
  ((actions$ = inject(Actions),
    jwtService = inject(LocalStorageJwtService),
    router = inject(Router)) => actions$.pipe(
      ofType(authActions.logout),
      tap(_ => {
        jwtService.removeItem();
        router.navigate(['/login'])
      })
    )
  ), { functional: true, dispatch: false }
)
