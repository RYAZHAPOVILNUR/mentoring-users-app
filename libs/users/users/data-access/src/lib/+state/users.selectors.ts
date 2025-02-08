import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectQueryParam, selectQueryParams, selectRouteParams } from '@users/core/data-access';
import { USERS_FEATURE_KEY, UsersFilter, UsersState, usersAdapter } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersFilter = createSelector(
  selectUsersState,
  (state: UsersState): UsersFilter => state.usersFilter
);

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const filteredUsers = createSelector(selectAllUsers, selectUsersFilter, (allUsers, filter) => {
  return allUsers.filter((user) => {
    const matchesName = filter.name ? user.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
    return matchesName;
  });
});

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);
