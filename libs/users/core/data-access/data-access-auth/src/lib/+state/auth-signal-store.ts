// @ts-ignore

import { computed, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, concatMap, map, of, pipe, switchMap, tap } from 'rxjs';

import { LocalStorageJwtService } from '@core/data-access-interceptors';
import { LoadingStatus } from '@shared/util-store';
import { usersDTOAdapter, UsersEntity } from '@users/core/data-access-models';

import { AuthService } from './auth.service';
import { NewUser, SignAuthPayload } from './sign.auth.model';

export interface AuthState {
  authStatus: LoadingStatus;
  error: string | null;
  authToken: string;
  loggedUser: UsersEntity;
}

export const authInitialState: AuthState = {
  authStatus: 'init',
  error: null,
  authToken: '',
  loggedUser: {
    email: '',
    name: '',
    username: '',
    city: '',
    purchaseDate: new Date().toString(),
    educationStatus: 'trainee',
    educationTime: 0,
    totalStoryPoints: 0,
    id: 0,
    photo: null,
    isAdmin: null,
  },
};


export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(authInitialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageJwtService = inject(LocalStorageJwtService),
      router = inject(Router),
    ) => ({
      login: rxMethod<{ userData: SignAuthPayload }>(
        pipe(
          tap(() => patchState(store, { authStatus: 'loading' })),
          switchMap(({ userData }) =>
            authService.login(userData).pipe(
              map((res) => {
                const userEntity = usersDTOAdapter.DTOtoEntity(res.user);
                const updatedRes = { ...res, user: userEntity };
                return updatedRes;
              }),
              tap((res) => {
                patchState(store, {
                  authStatus: 'loaded',
                  authToken: res.authToken,
                  loggedUser: res.user,
                  error: null,
                });
                localStorageJwtService.setItem(res.authToken);
                router.navigateByUrl('/profile');
              }),
              catchError((err: Error) => {
                console.log(err.message);
                patchState(store, { error: err.message });
                return of(err);
              }),
            ),
          ),
        ),
      ),
      getUser: rxMethod<void>(
        pipe(
          map(() => store.authStatus()),
          switchMap((authStatus) =>
            localStorageJwtService.getItem() && authStatus !== 'loaded'
              ? authService.getUser().pipe(
                  map((userDTO) => {
                    patchState(store, {
                      loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
                      authStatus: 'loaded' as const,
                    });
                  }),
                  catchError((err) => {
                    patchState(store, { error: err.message });
                    return of(err);
                  }),
                )
              : of(),
          ),
        ),
      ),
      logout: rxMethod<void>(
        pipe(
          tap(() => {
            localStorageJwtService.removeItem();
            router.navigate(['/login']);
            const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
            if (notDefaultTheme) notDefaultTheme.remove();
          }),
        ),
      ),
      register: rxMethod<{ userData: NewUser }>(
        pipe(
          switchMap(({ userData }) =>
            authService.register(userData).pipe(
              tap(({ authToken }) => {
                localStorageJwtService.setItem(authToken);
                router.navigate(['/profile']);
              }),
              switchMap(() => authService.getUser()),
              tap((user) => patchState(store, {
                authStatus: 'loaded' as const,
                loggedUser: usersDTOAdapter.DTOtoEntity(user),
                }),
              ),
            ),
          ),

        )
      ),
    }),
  ),
  withComputed((store) => ({
    isAdmin: computed(() => store.loggedUser().isAdmin),
    authToken: computed(() => store.authToken()),
    isAuthenticated: computed(() => store.authStatus() === 'loaded'),
    loggedUser: computed(() => store.loggedUser()),
    loggedUserId: computed(() => store.loggedUser().id),
    status: computed(() => store.authStatus()),
  })),
);
