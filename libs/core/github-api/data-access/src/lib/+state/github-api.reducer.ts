import { createFeature, createReducer, on } from '@ngrx/store';
import { githubApiActions } from './github-api.actions';
import { LoadingStatus } from '@users/core/data-access';
import { GithubUserDTO } from '../models/github-user-DTO.model';

export const authFeatureKey = 'auth';

export interface GithubApiState {
  status: LoadingStatus,
  error: Error | null,
  accessToken: string,
  githubUser: GithubUserDTO | null,
}

export const githubApiInitialState: GithubApiState = {
  status: 'init',
  error: null,
  accessToken: '',
  githubUser: null
};

export const githubApiFeature = createFeature({
  name: 'githubApi',
  reducer: createReducer(
    githubApiInitialState,
    on(githubApiActions.getAccessToken, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(githubApiActions.getAccessTokenSuccess, (state, { token }) => ({
      ...state,
      status: 'loaded' as const,
      authToken: token
    })),
    on(githubApiActions.getAccessTokenFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })),
    on(githubApiActions.getGithubUser, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(githubApiActions.getGithubUserSuccess, (state, { user }) => ({
      ...state,
      status: 'loaded' as const,
      githubUser: user
    })),
    on(githubApiActions.getGithubUserFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })),
    on(githubApiActions.logoutFromGithub, (state) => ({
      ...state,
      githubUser: null
    }))
  )
});

