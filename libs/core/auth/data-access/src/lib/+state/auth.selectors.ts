import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeature, authFeatureKey, AuthState } from "./auth.reducer";
import {LoadingStatus} from "@users/core/data-access";

export const selectUsersState =
  createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAdmin = createSelector(
  selectUsersState,
  (state: AuthState) => state.loggedUser.isAdmin
)

export const {selectAuthStatus, selectAuthToken, selectError, selectLoggedUser, selectAuthState} = authFeature

export const selectIsAuthenticated = createSelector(
  selectAuthStatus,
  (loadingStatus: LoadingStatus) => loadingStatus === 'loaded'
);
