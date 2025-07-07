import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersAdapter, UsersState } from './users.reducer';
import { selectRouteParams } from '@shared/util-store';

// 1. Feature state
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

// 2. Entity selectors
const { selectAll, selectEntities } = usersAdapter.getSelectors();

// 3. Основные селекторы
export const selectUsersStatus = createSelector(selectUsersState, state => state.status);
export const selectUsersError = createSelector(selectUsersState, state => state.error);
export const selectAllUsers = createSelector(selectUsersState, selectAll);
export const selectUsersEntities = createSelector(selectUsersState, selectEntities);
export const selectSelectedId = createSelector(selectUsersState, state => state.selectedId);

export const selectEntity = createSelector(
  selectUsersEntities,
  selectSelectedId,
  (entities, selectedId) => selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) =>
  createSelector(selectUsersEntities, entities => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectUsersFilter = createSelector(
  selectUsersState,
  (state) => state.usersFilter
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUsersFilter,
  (users, filter) => {
    if (!filter.name?.trim()) return users;
    const nameLower = filter.name.toLowerCase();
    return users.filter(user => user.name?.toLowerCase().includes(nameLower));
  }
);
