import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersAdapter, UsersState } from './users.reducer';
import { selectRouteParams, UsersEntity } from '@users/core/data-access';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(
  selectUsersState,
  (state: UsersState) => state.status
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => selectAll(state)
);

export const selectUsersEntities = createSelector(
  selectUsersState,
  (state: UsersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectUsersState,
  (state: UsersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectUsersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectUserById = (id: number) => createSelector(
  selectUsersEntities,
  (entities) => entities[id]
);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectFilter = createSelector(
  selectUsersState,
  (state: UsersState) => state.usersFilter
);

export const filteredUsers = createSelector(
  selectFilter,
  selectAllUsers,
  ({ value, field }, allUsers: UsersEntity[]): UsersEntity[] =>
    value ?
      allUsers.filter((user: UsersEntity) =>
        user[field].includes(value))
      : allUsers);
