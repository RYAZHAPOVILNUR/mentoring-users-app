import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { SignAuthResponse } from './sign.auth.model';

export const authFeatureKey = 'auth';

export type AuthLoadingStatus = 'init' | 'loggin out' | 'loading' | 'loggin in'

export interface AuthState {
  status: AuthLoadingStatus
  error: string | null
  authData: SignAuthResponse
}

export const authInitialState: AuthState = {
  status: 'init',
  error: null,
  authData: {
    accessToken: '',
    expiresIn: null,
    id: null
  }
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(AuthActions.login, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

  ),
});

