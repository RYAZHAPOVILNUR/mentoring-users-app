import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, filter, of, pipe, switchMap, tap } from 'rxjs';

import { LocalStorageJwtService } from '@core/data-access-interceptors';
import { LoadingStatus } from '@shared/util-store';
import { UserEntity } from '@users/shared/data-access-models';

import { ChangePasswordPayload, ChangeProfileDataPayload, NewUser, SignAuthPayload } from '../models/sign.auth.model';
import { AuthService } from '../services/auth.service';

interface AuthState {
  status: LoadingStatus;
  error: string | null;
  token: string | null;
  loggedUser: UserEntity | null;
}

const initialState: AuthState = {
  status: 'init',
  error: null,
  token: null,
  loggedUser: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isAdmin: computed(() => store.loggedUser()?.isAdmin),
    isAuthenticated: computed(() => store.status() === 'loaded'),
    loggedUserId: computed(() => store.loggedUser()?.id),
    userPhoto: computed(() => store.loggedUser()?.photo?.url),
  })),
  withMethods((store) => ({
    handleError(err: HttpErrorResponse) {
      patchState(store, { error: err.error.message });
      return of(EMPTY);
    },
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageJwtService = inject(LocalStorageJwtService),
      router = inject(Router),
    ) => ({
      login: rxMethod<{ userData: SignAuthPayload }>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap(({ userData }) =>
            authService.login(userData).pipe(
              tap((res) => {
                patchState(store, { status: 'loaded', token: res.authToken, loggedUser: res.user });
                console.log(res.user.isAdmin);
                localStorageJwtService.setItem(res.authToken);
                router.navigate(['/profile']);
              }),
              catchError(store.handleError),
            ),
          ),
        ),
      ),
      getUser: rxMethod<void>(
        pipe(
          filter(() => store.status() !== 'loaded' && Boolean(localStorageJwtService.getItem())),
          switchMap(() =>
            authService.getUser().pipe(
              tap((user: UserEntity) => {
                patchState(store, { loggedUser: user, status: 'loaded' });
                console.log(user);
              }),
              catchError(store.handleError),
            ),
          ),
        ),
      ),
      register: rxMethod<{ user: NewUser }>(
        pipe(
          switchMap(({ user }) =>
            authService.register(user).pipe(
              tap((res) => {
                localStorageJwtService.setItem(res.authToken);
                router.navigateByUrl('/login');
              }),
              catchError(store.handleError),
            ),
          ),
        ),
      ),
      logout: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, { ...initialState });
            localStorageJwtService.removeItem();
            router.navigate(['/login']);
            const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
            if (notDefaultTheme) notDefaultTheme.remove();
          }),
          catchError(store.handleError),
        ),
      ),
      changePassword: rxMethod<{ data: ChangePasswordPayload }>(
        pipe(
          switchMap(({ data }) =>
            authService.changePassword(data).pipe(
              tap(() => {
                alert('Password changed successfully.');
              }),
              catchError(store.handleError),
            ),
          ),
        ),
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uploadImage: rxMethod<{ image: any }>(
        pipe(
          switchMap(({ image }) =>
            authService.uploadImage(image).pipe(
              tap((user) => {
                patchState(store, { loggedUser: user });
              }),
              catchError(store.handleError),
            ),
          ),
        ),
      ),
      changeProfileData: rxMethod<{ data: ChangeProfileDataPayload }>(
        pipe(
          tap(() => {
            alert('While we can not change data!');
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store) {
      store.getUser();
    },
  }),
);
