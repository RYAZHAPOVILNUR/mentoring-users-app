import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@shared/util-store';
import { UserEntity } from '@users/shared/data-access-models';

import { usersAdapter, UsersState } from './users.reducer';
import { USERS_FEATURE_KEY } from '../constants/users-feature-key.constant';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersFilter = createSelector(selectUsersState, (state: UsersState) => state.usersFilter);

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectFilteredUsers = createSelector(selectUsersFilter, selectAllUsers, (filter, users) => {
  if (!filter.name) return users;
  return users.filter((user: UserEntity) => user.name?.toLowerCase().includes(filter.name.toLowerCase()));
});

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null,
);
