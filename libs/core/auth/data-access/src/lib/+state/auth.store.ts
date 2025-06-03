import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { UsersEntity, LoadingStatus, usersDTOAdapter, UsersDTO } from '@users/core/data-access';
import { SignAuthUser } from './sign.auth.model';
import { computed } from '@angular/core';

export interface AuthState {
  status: LoadingStatus;
  error: string | null;
  token: string;
  loggedUser: UsersEntity;
}

export const initialAuthState: AuthState = {
  status: 'init',
  error: null,
  token: '',
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
  withState(initialAuthState),
  withMethods(({ status, ...store }) => ({
    login() {
      patchState(store, {
        status: 'loading',
      });
    },

    loginSuccess(signAuthUser: SignAuthUser) {
      patchState(store, {
        status: 'loaded',
        token: signAuthUser.authToken,
        loggedUser: signAuthUser.user,
      });
    },

    getUserSuccess(userDTO: UsersDTO) {
      patchState(store, {
        status: 'loaded',
        loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
      });
    },

    logout() {
      patchState(store, { ...initialAuthState });
    },

    uploadImage(userDTO: UsersDTO) {
      patchState(store, {
        loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
      });
    },

    setErrorState(e: any) {
      patchState(store, {
        status: 'error',
        error: e?.message || 'Ошибка авторизации',
      });
    },
  })),
  withComputed(({ loggedUser, status }) => ({
    isAdmin: computed(() => loggedUser().isAdmin),
    isAuthenticated: computed(() => status() === 'loaded'),
    loggedUserId: computed(() => loggedUser().id),
  })),
);
