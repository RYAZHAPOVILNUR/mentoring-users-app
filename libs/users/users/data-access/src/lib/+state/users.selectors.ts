import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USERS_FEATURE_KEY, usersAdapter, UsersState} from './users.reducer';
import {selectRouteParams} from '@users/core/data-access';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const usersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const allUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const openedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);
export const filterName = createSelector(
    selectUsersState,
    state => state.filterName
)

export const selectedUsers = createSelector(
    allUsers,
    selectUsersState,
    (users, { filterName }) => {
        return users.filter((user) => {
                return user.name.toLowerCase().includes(
                    filterName.toLowerCase()
                )
            }
        )
    }
);