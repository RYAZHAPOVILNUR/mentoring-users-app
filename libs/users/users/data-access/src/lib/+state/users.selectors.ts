import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectRouteParams } from '@users/core/data-access';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const usersFilterSelector = createSelector(selectUsersState, (state: UsersState) => state.usersFilter);
// 4. Создать селектор usersFilterSelector который будет из стора вытягивать поле usersFilter
export const filteredUsers = createSelector (
  usersFilterSelector,
  selectAllUsers,
  (usersFilter, allUsers) => {
    if (!usersFilter.name) return allUsers
    return allUsers.filter(
      (user) => user.name.includes(usersFilter.name)
    );
  }
)
// 5. Добавить новый селектор filteredUsers который будет включать в себя два других селектора (usersFilter и allUsers) и на выход будут даваться уже отфильтрованные данные, если фильтр пустой, то возвращать всех пользователей
// 3в. здесь происходит фильтрация юзеров на 18 строке
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


// export const filteredUsers = createSelector(selectAllUsers, selectUsersFilter, (users, filter) => users.filter(user => user));

