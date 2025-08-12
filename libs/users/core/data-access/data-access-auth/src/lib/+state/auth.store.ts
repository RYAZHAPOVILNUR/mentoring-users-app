import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, pipe, switchMap, tap } from 'rxjs';

import { LoadingStatus, withErrorHandler, ErrorMsg } from '@shared/util-store';
import { UserEntity } from '@users/shared/data-access-models';

import { ChangePasswordPayload, ChangeProfileDataPayload, NewUser, SignAuthPayload } from '../models/sign.auth.model';
import { AuthService } from '../services/auth.service';

interface AuthState {
  status: LoadingStatus;
  error: string | null;
  loggedUser: UserEntity | null;
}

const initialState: AuthState = {
  status: 'init',
  error: null,
  loggedUser: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isAdmin: computed(() => Boolean(store.loggedUser()?.isAdmin)),
    loggedUserId: computed(() => store.loggedUser()?.id),
    userPhoto: computed(() => store.loggedUser()?.photo?.url),
  })),
  withMethods((store) => ({
    setLoggedUser: (user: UserEntity | null) => {
      patchState(store, { loggedUser: user });
    },
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    login: rxMethod<{ data: SignAuthPayload }>(
      pipe(
        tap(() => patchState(store, { status: 'loading', error: null })),
        switchMap(({ data }) =>
          authService.login(data).pipe(
            tap((res) => {
              patchState(store, { status: 'loaded', loggedUser: res.user });
            }),
          ),
        ),
        withErrorHandler(ErrorMsg.API_ERROR),
      ),
    ),
    getUser: rxMethod<void>(
      pipe(
        filter(() => Boolean(store.status() !== 'loaded' && localStorage.getItem('jwtToken'))),
        switchMap(() =>
          authService.getUser().pipe(
            tap((user: UserEntity) => {
              patchState(store, { loggedUser: user, status: 'loaded' });
            }),
          ),
        ),
        withErrorHandler(ErrorMsg.API_ERROR),
      ),
    ),
    register: rxMethod<{ user: NewUser }>(
      pipe(
        switchMap(({ user }) => authService.register(user)),
        withErrorHandler(ErrorMsg.API_ERROR),
      ),
    ),
    logout: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { ...initialState });
          authService.resetState();
        }),
      ),
    ),
    changePassword: rxMethod<{ data: ChangePasswordPayload }>(
      pipe(
        exhaustMap(({ data }) => authService.changePassword(data)),
        withErrorHandler(ErrorMsg.API_ERROR),
      ),
    ),
    changeProfileData: rxMethod<{ data: ChangeProfileDataPayload }>(pipe()),
  })),
  withHooks({
    onInit(store) {
      store.getUser();
    },
  }),
);
