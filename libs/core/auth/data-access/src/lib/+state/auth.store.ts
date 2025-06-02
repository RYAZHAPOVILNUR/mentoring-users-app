import { signalStore, withState, withComputed, withMethods, patchState, withProps } from '@ngrx/signals';
import { UsersEntity, LoadingStatus, usersDTOAdapter, UsersDTO } from '@users/core/data-access';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
} from './sign.auth.model';
import { computed, inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { firstValueFrom } from 'rxjs';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { Router } from '@angular/router';

export interface AuthState {
  authStatus: LoadingStatus;
  error: string | null;
  authToken: string;
  loggedUser: UsersEntity;
}

const initialState: AuthState = {
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
  withState(initialState),
  withProps(() => ({
    apiService: inject(ApiService),
    localStorageJwtService: inject(LocalStorageJwtService),
    router: inject(Router),
  })),
  withMethods(({ apiService, localStorageJwtService, router, authStatus, ...store }) => ({
    async login(userData: SignAuthPayload) {
      patchState(store, {
        authStatus: 'loading' as const,
      });
      try {
        const signAuthUser = await firstValueFrom(
          apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData),
        );
        patchState(store, {
          authStatus: 'loaded' as const,
          authToken: signAuthUser.authToken,
          loggedUser: usersDTOAdapter.DTOtoEntity(signAuthUser.user),
        });
        localStorageJwtService.setItem(signAuthUser.authToken);
        router.navigateByUrl('/profile');
      } catch (e: any) {
        patchState(store, {
          authStatus: 'error' as const,
          error: e?.message || 'Ошибка авторизации',
        });
      }
    },

    async getUser() {
      try {
        if (localStorageJwtService.getItem() && authStatus() !== 'loaded') {
          const userDTO = await firstValueFrom(apiService.get<UsersDTO>('/auth/me'));
          patchState(store, {
            authStatus: 'loaded' as const,
            loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
          });
        } else {
          return;
        }
      } catch (e: any) {
        patchState(store, {
          authStatus: 'error' as const,
          error: e?.message || 'Ошибка авторизации',
        });
      }
    },

    async register(userData: NewUser) {
      try {
        const authToken = await firstValueFrom(apiService.post<RegisterResponse, NewUser>('/auth/signup', userData));
        localStorageJwtService.setItem(authToken.authToken);
        router.navigateByUrl('/profile');
        this.getUser();
      } catch (e: any) {
        patchState(store, {
          authStatus: 'error' as const,
          error: e?.message || 'Ошибка авторизации',
        });
      }
    },

    logout() {
      try {
        patchState(store, { ...initialState });
        localStorageJwtService.removeItem();
        router.navigate(['/login']);
        const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
        if (notDefaultTheme) notDefaultTheme.remove();
      } catch (e: any) {
        patchState(store, {
          authStatus: 'error' as const,
          error: e?.message || 'Ошибка авторизации',
        });
      }
    },

    async changePassword(data: ChangePasswordPayload) {
      try {
        await firstValueFrom(
          apiService.put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', data),
        );
      } catch (e: any) {
        patchState(store, {
          authStatus: 'error' as const,
          error: e?.message || 'Ошибка авторизации',
        });
      }
    },

    async uploadImage(image: any) {
      try {
        const userDTO = await firstValueFrom(apiService.post<UsersDTO, any>('/users/upload/image', { image }));
        patchState(store, {
          loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
        });
      } catch (e: any) {
        patchState(store, {
          authStatus: 'error' as const,
          error: e?.message || 'Ошибка авторизации',
        });
      }
    },
  })),
  withComputed(({ loggedUser, authStatus }) => ({
    signalIsAdmin: computed(() => loggedUser().isAdmin),
    signalIsAuthenticated: computed(() => authStatus() === 'loaded'),
    signalLoggedUserId: computed(() => loggedUser().id),
  })),
);
