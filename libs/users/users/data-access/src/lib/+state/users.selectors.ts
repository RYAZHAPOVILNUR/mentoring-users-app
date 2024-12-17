import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectQueryParam, selectQueryParams, selectRouteParams } from '@users/core/data-access';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectUsersFilterSelector = createSelector(selectUsersState, (state: UsersState) => state.usersFilter);

export const selectFilteredUsers = createSelector(selectAllUsers, selectUsersFilterSelector, (users, filter) => {
  // Если filter.name пустой, возвращаем всех пользователей
  if (!filter.name) {
    return users;
  }
  return users.filter((el) => el.name && el.name.includes(filter.name));
});

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);
