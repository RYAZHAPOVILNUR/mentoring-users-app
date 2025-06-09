import {
  signalStore,
  withState,
  withMethods,
  withProps,
  withComputed,
  patchState, 
} from '@ngrx/signals';
import {
  LoadingStatus,
  usersDTOAdapter,
  UsersEntity,
  UsersDTO,
} from '@users/core/data-access';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import {
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  ChangeProfileDataPayload,
  ThemeService,
} from '@auth/data-access';
import { ApiService } from '@users/core/http';
import { inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, mergeMap, tap, withLatestFrom } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { toObservable } from '@angular/core/rxjs-interop';

interface AuthStoreDeps {
  apiService: ApiService;
  localStorageJwtService: LocalStorageJwtService;
  router: Router;
}

export interface AuthState {
  status: LoadingStatus;
  error: string | null;
  token: string;
  loggedUser: UsersEntity;
}

export const emptyUser: UsersEntity = {
  id: 0,
  name: '',
  email: '',
  username: '',
  city: '',
  purchaseDate: '',
  educationStatus: '',
  educationTime: 0,
  totalStoryPoints: 0,
  photo: null,
  isAdmin: null,
};

const initialState: AuthState = {
  status: 'init',
  error: null,
  token: '',
  loggedUser: emptyUser,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),

  withProps((): AuthStoreDeps & { themeService: ThemeService } => ({
    apiService: inject(ApiService),
    localStorageJwtService: inject(LocalStorageJwtService),
    router: inject(Router),
    themeService: inject(ThemeService),
  })),
  

  withComputed(({ loggedUser }) => ({
    signalIsAdmin: computed(() => loggedUser()?.isAdmin === true),
    signalIsAuthenticated: computed(() => !!loggedUser()?.id),
    signalLoggedUserId: computed(() => loggedUser()?.id ?? null),
  })),

  withMethods(({ apiService, localStorageJwtService, router, themeService, status, ...store }) => {
    const handleError =
    (defaultMsg: string) =>
    (error: any) => {
      patchState(store, {
        status: 'error',
        error: error?.message || defaultMsg,
      });
      return EMPTY;
    }; 
    
    return {
      login: rxMethod<SignAuthPayload>((userData$) =>
        userData$.pipe(
          tap(() => patchState(store, { status: 'loading', error: null })),
          mergeMap((userData) =>
            apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData).pipe(
              tap((res) => {
                const user = usersDTOAdapter.DTOtoEntity(res.user);
                patchState(store, {
                  status: 'loaded',
                  token: res.authToken,
                  loggedUser: user,
                });
                localStorageJwtService.setItem(res.authToken);
                router.navigateByUrl('/profile');
              }),
              catchError(handleError('Ошибка авторизации'))
            )
          )
        )
      ),

      register: rxMethod<NewUser>((userData$) =>
        userData$.pipe(
          tap(() => patchState(store, { status: 'loading', error: null })),
          mergeMap((userData) =>
            apiService.post<RegisterResponse, NewUser>('/auth/signup', userData).pipe(
              tap((res) => {
                patchState(store, {
                  status: 'loaded',
                  token: res.authToken,
                });
                localStorageJwtService.setItem(res.authToken);
                router.navigateByUrl('/profile');
              }),
              catchError(handleError('Ошибка регистрации'))
            )
          )
        )
      ),

      getUser: rxMethod<void>((_void$) => {
        return _void$.pipe(
          withLatestFrom(toObservable(status)),
          mergeMap(([_void, status]) => {
            if (!localStorageJwtService.getItem() || status === 'loaded') {
              return EMPTY;
            }    
            return apiService.get<UsersDTO>('/auth/me').pipe(
              tap((userDTO) => {
                patchState(store, {
                  loggedUser: usersDTOAdapter.DTOtoEntity(userDTO),
                  status: 'loaded',
                });
              }),
              catchError(handleError('Ошибка авторизации'))
            );
          })
        );
      }),      
      
      changePassword: rxMethod<ChangePasswordPayload>((newPassword$) =>
        newPassword$.pipe(
          tap(() => patchState(store, { status: 'loading', error: null })),
          mergeMap((newPassword) =>
            apiService
              .put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', newPassword)
              .pipe(
                tap(() => patchState(store, { status: 'loaded' })),
                catchError(handleError('Ошибка смены пароля'))
              )
          )
        )
      ),

      changeProfileData: rxMethod<ChangeProfileDataPayload>((data$) =>
        data$.pipe(
          tap(() => patchState(store, { status: 'loading', error: null })),
          mergeMap((data) =>
            apiService.put<UsersDTO, ChangeProfileDataPayload>('/users/profile', data).pipe(
              tap((userDTO) => {
                const user = usersDTOAdapter.DTOtoEntity(userDTO);
                patchState(store, {
                  loggedUser: user,
                  status: 'loaded',
                });
              }),
              catchError(handleError('Ошибка изменения профиля'))
            )
          )
        )
      ),

      uploadImage: rxMethod<{ image: File }>((image$) =>
        image$.pipe(
          tap(() => patchState(store, { status: 'loading', error: null })),
          mergeMap(({ image }) => {
            const formData = new FormData();
            formData.append('image', image);

            return apiService.put<UsersDTO, FormData>('/users/upload/image', formData).pipe(
              tap((userDTO) => {
                const user = usersDTOAdapter.DTOtoEntity(userDTO);
                patchState(store, {
                  loggedUser: user,
                  status: 'loaded',
                });
              }),
              catchError(handleError('Ошибка смены аватарки'))
            );
          })
        )
      ),

      logout: () => {
        patchState(store, { ...initialState });
        localStorageJwtService.removeItem();
        router.navigateByUrl('/login');
        themeService.resetTheme();
      },
    };
  })
);


