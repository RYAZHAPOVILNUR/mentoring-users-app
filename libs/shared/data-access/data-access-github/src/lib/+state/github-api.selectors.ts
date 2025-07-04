import { createSelector } from '@ngrx/store';

import { githubApiFeature } from './github-api.reducer';

export const { selectError, selectStatus, selectAccessToken, selectGithubUser } = githubApiFeature;

export const selectGithubUserName = createSelector(selectGithubUser, (state) => state?.login);

export const selectGithubUserAvatar = createSelector(selectGithubUser, (state) => state?.avatar_url);

export const selectGithubStatus = createSelector(selectStatus, (state) => state);
