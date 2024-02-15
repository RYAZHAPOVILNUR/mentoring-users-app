import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectQueryParam, selectQueryParams, selectRouteParams, UsersEntity } from '@users/core/data-access';

export const filterFunctions = {
  email: (user: UsersEntity, value: string) => user.email.includes(value),
  name: (user: UsersEntity, value: string) => user.name.includes(value),
};

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

export const selectUsersFilter = createSelector(
  selectUsersState,
  (state: UsersState) => state.usersFilter
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUsersFilter,
  (users, filters) => users.filter(user =>
    filters.every(filter => {
      const filterFunction = filterFunctions[filter.type as keyof typeof filterFunctions];
      return filterFunction ? filterFunction(user, filter.value) : true;
    })
  )
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
