import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { authActions } from './auth.actions';
import { catchError, concatMap, debounceTime, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
} from './sign.auth.model';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { Router } from '@angular/router';
import { UsersDTO, usersDTOAdapter } from '@users/core/data-access';
import { Store } from '@ngrx/store';
import { selectAuthStatus } from './auth.selectors';

export const loginEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ userData }) =>
        api.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData).pipe(
          map((res) => {
            const userEntity = usersDTOAdapter.DTOtoEntity(res.user);
            const updatedRes = { ...res, user: userEntity };
            return authActions.loginSuccess({ res: updatedRes });
          }),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const loginSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.res.authToken);
        router.navigateByUrl('/profile');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getUserEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    api = inject(ApiService),
    localStorageJwtService = inject(LocalStorageJwtService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(authActions.getUser),
      debounceTime(1000),
      withLatestFrom(store.select(selectAuthStatus)),
      switchMap(([, authStatus]) =>
        localStorageJwtService.getItem() && authStatus !== 'loaded'
          ? api.get<UsersDTO>('/auth/me').pipe(
              map((userDTO) =>
                authActions.getUserSuccess({
                  user: usersDTOAdapter.DTOtoEntity(userDTO),
                })
              ),
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
      switchMap(({ userData }) =>
        api.post<RegisterResponse, NewUser>('/auth/signup', userData).pipe(
          map(({ authToken }) => authActions.registerSuccess({ authToken })),
          catchError((error) => of(authActions.registerFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const registerSuccessEffects$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      concatMap((action) => {
        localStorageJwtService.setItem(action.authToken);
        router.navigateByUrl('/profile');
        return of(authActions.getUser());
      })
    );
  },
  { functional: true }
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
      })
    ),
  { functional: true, dispatch: false }
);

export const changePasswordEffects$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.changePassword),
      switchMap(({ data }) =>
        api.put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', data).pipe(
          map((res) => authActions.changePasswordSuccess({ res })),
          catchError((error) => of(authActions.changePasswordFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const uploadImageEffects$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.uploadImage),
      switchMap(({ image }) =>
        api.post<UsersDTO, any>('/users/upload/image', { image }).pipe(
          map((userDTO) =>
            authActions.uploadImageSuccess({
              user: usersDTOAdapter.DTOtoEntity(userDTO),
            })
          ),
          catchError((error) => of(authActions.uploadImageFailure({ error })))
        )
      )
    ),
  { functional: true }
);
