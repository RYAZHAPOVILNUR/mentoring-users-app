import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { LocalStorageJwtService } from '@core/data-access-interceptors';
import { UserDTO, userAdapter } from '@users/shared/data-access-models';

import { authActions } from './auth.actions';
import { selectAuthStatus } from './auth.selectors';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
} from './sign.auth.model';

export const loginEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ userData }) =>
        api.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData).pipe(
          map((res) => {
            const userEntity = userAdapter.DTOtoEntity(res.user);
            const updatedRes = { ...res, user: userEntity };
            return authActions.loginSuccess({ res: updatedRes });
          }),
          catchError((error) => of(authActions.loginFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);

export const loginSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.res.authToken);
        router.navigateByUrl('/profile');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const getUserEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    api = inject(ApiService),
    localStorageJwtService = inject(LocalStorageJwtService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(authActions.getUser),
      withLatestFrom(store.select(selectAuthStatus)),
      switchMap(([, authStatus]) =>
        localStorageJwtService.getItem() && authStatus !== 'loaded'
          ? api.get<UserDTO>('/auth/me').pipe(
              map((userDTO) =>
                authActions.getUserSuccess({
                  user: userAdapter.DTOtoEntity(userDTO),
                }),
              ),
              catchError((error) => of(authActions.getUserFailure({ error }))),
            )
          : of(),
      ),
    ),
  { functional: true },
);

export const registerEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ userData }) =>
        api.post<RegisterResponse, NewUser>('/auth/signup', userData).pipe(
          map(({ authToken }) => authActions.registerSuccess({ authToken })),
          catchError((error) => of(authActions.registerFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const registerSuccessEffects$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      concatMap((action) => {
        localStorageJwtService.setItem(action.authToken);
        router.navigateByUrl('/profile');
        return of(authActions.getUser());
      }),
    );
  },
  { functional: true },
);

export const logoutEffect$ = createEffect(
  (actions$ = inject(Actions), jwtService = inject(LocalStorageJwtService), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        jwtService.removeItem();
        router.navigate(['/login']);
        const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
        if (notDefaultTheme) notDefaultTheme.remove();
      }),
    ),
  { functional: true, dispatch: false },
);

export const changePasswordEffects$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.changePassword),
      switchMap(({ data }) =>
        api.put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', data).pipe(
          map((res) => authActions.changePasswordSuccess({ res })),
          catchError((error) => of(authActions.changePasswordFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);

export const uploadImageEffects$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.uploadImage),
      switchMap(({ image }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.post<UserDTO, any>('/users/upload/image', { image }).pipe(
          map((userDTO) =>
            authActions.uploadImageSuccess({
              user: userAdapter.DTOtoEntity(userDTO),
            }),
          ),
          catchError((error) => of(authActions.uploadImageFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
