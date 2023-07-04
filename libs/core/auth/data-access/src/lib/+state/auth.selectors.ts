import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeature, authFeatureKey, AuthState } from "./auth.reducer";

export const selectUsersState =
  createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectUsersState,
  (state: AuthState) => state.loggedUser.id
);

export const selectIsAdmin = createSelector(
  selectUsersState,
  (state: AuthState) => state.loggedUser.isAdmin
)

export const {selectAuthStatus, selectAuthToken, selectError, selectLoggedUser, selectAuthState} = authFeature
