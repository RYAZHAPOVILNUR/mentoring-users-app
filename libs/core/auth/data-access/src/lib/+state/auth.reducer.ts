import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { SignAuthResponse } from './sign.auth.model';
import { LoadingStatus } from '@users/core/data-access';

export const authFeatureKey = 'auth';

export interface AuthState {
  status: LoadingStatus
  error: string | null
  authData: SignAuthResponse,
}

export const authInitialState: AuthState = {
  status: 'init',
  error: null,
  authData: {
    authToken: '',
    expiresIn: null,
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
    on(authActions.loginSuccess, (state, {res}) => ({
      ...state,
      status: 'loaded' as const,
      authData: res
    }))
  ),
});

