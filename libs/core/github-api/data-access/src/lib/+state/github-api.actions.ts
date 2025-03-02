import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GithubUserDTO } from '../models/github-user-DTO.model';

export const githubApiActions = createActionGroup({
  source: 'githubApi',
  events: {
    loginWithGithub: emptyProps(),
    logoutFromGithub: emptyProps(),
    getAccessToken: props<{ code: string }>(),
    getAccessTokenFailure: props<{ error: Error }>(),
    getAccessTokenSuccess: props<{ token: string }>(),
    getGithubUser: props<{ token: string }>(),
    getGithubUserFailure: props<{ error: Error }>(),
    getGithubUserSuccess: props<{ user: GithubUserDTO }>()
  }
});
