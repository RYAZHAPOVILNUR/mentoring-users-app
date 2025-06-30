import { createSelector } from '@ngrx/store';

import { LoadingStatus, UsersEntity } from '@users/core/data-access';

import { authFeature, AuthState } from './auth.reducer';

// export const selectUsersState =
//   createFeatureSelector<AuthState>(authFeatureKey);

export const { selectAuthStatus, selectAuthToken, selectError, selectLoggedUser, selectAuthState } = authFeature;

export const selectIsAdmin = createSelector(selectAuthState, (state: AuthState) => state.loggedUser.isAdmin);

export const selectIsAuthenticated = createSelector(
  selectAuthStatus,
  (loadingStatus: LoadingStatus) => loadingStatus === 'loaded',
);

export const selectLoggedUserId = createSelector(selectLoggedUser, (loggedInUser: UsersEntity) => loggedInUser.id);
