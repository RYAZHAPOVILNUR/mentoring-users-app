import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersAdapter, UsersState } from './users.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { UsersFilters } from './users.types';

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

export const selectUserById = (id: number) =>
  createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectUsersFilters = createSelector(
  selectUsersState,
  (state: UsersState) => state.usersFilters
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUsersFilters,
  (users, filters) => {
    return users.filter((user) => {
      return Object.keys(filters).every((keyName) => {
        return (user[keyName as keyof UsersFilters] as string).match(
          filters[keyName as keyof UsersFilters] as string
        );
      });
    });
  }
);
