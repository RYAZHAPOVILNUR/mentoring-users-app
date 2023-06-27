import { createFeatureSelector, createSelector } from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";

export const selectUsersState =
  createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectUsersState,
  (state: AuthState) => state.loggedUser.id
);

export const selectLoggedUser = createSelector(
  selectUsersState,
  (state: AuthState) => state.loggedUser
)
