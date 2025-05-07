import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectRouteParams } from '@users/core/data-access';

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

export const selectUsersFilter = createSelector(
  selectUsersState,
  (state: UsersState) => state.filterParams
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUsersFilter,
  (users, filter) => {
    if (!filter) {
      return users;
    }

    return users.filter(user => {
      let matchesFilter = true;

      if (filter.purchaseDate) {
        if (user.purchaseDate) {
          const userDate = new Date(user.purchaseDate);

          if (filter.purchaseDate.start && matchesFilter) {
            const startDate = new Date(filter.purchaseDate.start);
            matchesFilter = userDate >= startDate;
          }

          if (filter.purchaseDate.end && matchesFilter) {
            const endDate = new Date(filter.purchaseDate.end);
            matchesFilter = userDate <= endDate;
          }
        } else if (filter.purchaseDate.start || filter.purchaseDate.end) {
          matchesFilter = false;
        }
      }

      if (filter.educationTime && matchesFilter) {
        if (filter.educationTime.min !== null && (user.educationTime ?? 0) < filter.educationTime.min) {
          matchesFilter = false;
        }
        if (filter.educationTime.max !== null && (user.educationTime ?? 0) > filter.educationTime.max) {
          matchesFilter = false;
        }
      }

      if (filter.totalStoryPoints && matchesFilter) {
        if (filter.totalStoryPoints.min !== null && (user.totalStoryPoints ?? 0) < filter.totalStoryPoints.min) {
          matchesFilter = false;
        }
        if (filter.totalStoryPoints.max !== null && (user.totalStoryPoints ?? 0) > filter.totalStoryPoints.max) {
          matchesFilter = false;
        }
      }
      return matchesFilter;
    });
  }
);
