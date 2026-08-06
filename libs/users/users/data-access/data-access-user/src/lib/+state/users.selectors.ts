import { createFeatureSelector, createSelector, State } from '@ngrx/store';

import { selectRouteParams } from '@shared/util-store';

import { usersAdapter, UsersState } from './users.reducer';
import { USERS_FEATURE_KEY } from '../constants/users-feature-key.constant';
import { UserEntity } from '@users/shared/data-access-models';

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null,
);
export const usersFilterSelector = createSelector(selectUsersState, (State: UsersState) => State.usersFilter);
export const filterUsers = createSelector(
  usersFilterSelector,
  selectAllUsers,
  (usersFilter: { name: string }, allUsers: UserEntity[]) => {
    if (!usersFilter.name) return allUsers;
    return allUsers.filter((user) => user.name.includes(usersFilter.name));
  },
);
