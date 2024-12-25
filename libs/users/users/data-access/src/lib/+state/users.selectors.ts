import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectQueryParam, selectQueryParams, selectRouteParams, UsersEntity } from '@users/core/data-access';
import { filter, Observable } from 'rxjs';
import { USERS_FEATURE_KEY, usersAdapter, UsersState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectUsersFilter = createSelector(selectUsersState, (state: UsersState) => state.usersFilter);

export const selectFilteredUsers = createSelector(
  selectUsersFilter,
  selectAllUsers,
  (filter: { name: string }, allUsers: UsersEntity[]): UsersEntity[] =>
    !filter.name ? allUsers : allUsers.filter((user) => user.name.toLowerCase().includes(filter.name.toLowerCase()))
);
