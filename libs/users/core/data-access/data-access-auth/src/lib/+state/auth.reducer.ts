import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersEntity } from '@users/core/data-access-models';

import { LoadingStatus } from '@shared/util-store';

import { authActions } from './auth.actions';

export const authFeatureKey = 'auth';

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

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(authActions.login, (state) => ({
      ...state,
      authStatus: 'loading' as const,
    })),
    on(authActions.loginSuccess, (state, { res }) => ({
      ...state,
      authStatus: 'loaded' as const,
      authToken: res.authToken,
      loggedUser: res.user,
    })),
    on(authActions.getUser, (state) => ({
      ...state,
    })),
    on(authActions.getUserSuccess, (state, { user }) => ({
      ...state,
      authStatus: 'loaded' as const,
      loggedUser: user,
    })),
    on(authActions.logout, (state) => ({
      ...state,
      ...authInitialState,
    })),
    on(authActions.uploadImageSuccess, (state, { user }) => ({
      ...state,
      loggedUser: user,
    })),
  ),
});
