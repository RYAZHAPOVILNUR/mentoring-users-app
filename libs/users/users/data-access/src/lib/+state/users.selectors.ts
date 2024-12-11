import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectQueryParam, selectQueryParams, selectRouteParams, UsersEntity } from '@users/core/data-access';
import { filter } from 'rxjs';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) =>{
  let users = selectAll(state);
  if (state.filter !== null) {
    const filter = state.filter.toLowerCase(); // Приводим фильтр к нижнему регистру
    // Условие фильтрации: ищем пользователей, у которых имя или email содержит фильтр
    users = users.filter(
      user =>
        user.name.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter)
    );
    return users;
  }else{
    return users;
  }



})


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
