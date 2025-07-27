import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  ChangePasswordPayload,
  ChangeProfileDataPayload,
  NewUser,
  SignAuthPayload,
  usersDTOAdapter,
  UsersEntity,
} from '@users/core/data-access-models';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { LocalStorageJwtService } from '@core/data-access-interceptors';
import { NotificationService } from '@shared/util-notification';
import { LoadingStatus } from '@shared/util-store';

import { AuthService } from '../services/auth.service';

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
      notificationService = inject(NotificationService),
    ) => ({
      login: rxMethod<{ userData: SignAuthPayload }>(
        pipe(
          tap(() => patchState(store, { authStatus: 'loading' })),
          switchMap(({ userData }) =>
            authService.login(userData).pipe(
              tap((res) => {
                patchState(store, {
                  authStatus: 'loaded',
                  authToken: res.authToken,
                  loggedUser: res.user,
                  error: null,
                });
              }),
              catchError((err: Error) => {
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
                    notificationService.showSnackbar('Произошла ошибка. Не смогли получить ваши данные');
                    return of(err);
                  }),
                )
              : of(),
          ),
        ),
      ),
      logout() {
        authService.logout();
      },
      register: rxMethod<{ userData: NewUser }>(
        pipe(
          switchMap(({ userData }) =>
            authService.register(userData).pipe(
              tap((user) =>
                patchState(store, {
                  authStatus: 'loaded' as const,
                  loggedUser: usersDTOAdapter.DTOtoEntity(user),
                }),
              ),
              catchError((err) => {
                patchState(store, { error: err.message });
                notificationService.showSnackbar('Произошла ошибка. Попробуйте ещё раз');
                return of(err);
              }),
            ),
          ),
        ),
      ),
      changePassword: rxMethod<{ data: ChangePasswordPayload }>(
        pipe(
          switchMap(({ data }) =>
            authService.changePassword(data).pipe(
              tap(() => {
                notificationService.showSnackbar('Пароль успешно изменён');
              }),
              catchError((err) => {
                patchState(store, { error: err.message });
                notificationService.showSnackbar('Произошла ошибка. Попробуйте ещё раз');
                return of(err);
              }),
            ),
          ),
        ),
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uploadImage: rxMethod<{ image: any }>(
        pipe(
          switchMap(({ image }) =>
            authService.uploadImage(image).pipe(
              tap((userDTO) => {
                patchState(store, {
                  loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
                });
              }),
              catchError((err) => {
                patchState(store, { error: err.message });
                notificationService.showSnackbar('Произошла ошибка. Попробуйте ещё раз');
                return of(err);
              }),
            ),
          ),
        ),
      ),
      changeProfileData: rxMethod<{ userData: ChangeProfileDataPayload }>(
        pipe(
          tap(() => {
            notificationService.showSnackbar('УУУУППППСССС! Что-то пошло не так :(');
          }),
        ),
      ),
    }),
  ),
  withComputed((store) => ({
    isAdmin: computed(() => store.loggedUser().isAdmin),
    isAuthenticated: computed(() => store.authStatus() === 'loaded'),
    loggedUserId: computed(() => store.loggedUser().id),
    status: computed(() => store.authStatus()),
  })),
);
