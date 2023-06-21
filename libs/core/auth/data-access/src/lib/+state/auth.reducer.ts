import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { LoggedInUser, SignAuthResponse } from './sign.auth.model';
import { LoadingStatus } from '@users/core/data-access';

export const authFeatureKey = 'auth';

export interface AuthState {
  status: LoadingStatus
  error: string | null
  authToken: string
  loggedUser: LoggedInUser,
}

export const authInitialState: AuthState = {
  status: 'init',
  error: null,
  authToken: '',
  loggedUser: {
    email: '',
    name: '',
    username: '',
    city: '',
    id: null
  }
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(authActions.login, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(authActions.loginSuccess, (state, { res }) => ({
      ...state,
      status: 'loaded' as const,
      authToken: res.authToken,
      loggedUser: res.user
    })),
    on(authActions.getUserSuccess, (state, { user }) => ({
      ...state,
      status: 'loading' as const,
      loggedUser: user
    }))
  ),
});

