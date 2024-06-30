import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectQueryParam, selectQueryParams, selectRouteParams, UsersEntity } from '@users/core/data-access';

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

export const usersFilterSelector = createSelector(selectUsersState, (state: UsersState) => state.usersFilter);


export const filteredUsers = createSelector(
  selectAllUsers,
  usersFilterSelector,
  (allUsers: UsersEntity[], filter: { name: string }): UsersEntity[] => {
    if (!filter.name) return allUsers;
    else return allUsers.filter((user: UsersEntity): boolean => user.name.toLowerCase().includes(filter.name.toLowerCase()));
  }
);
