import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';
import { UserEntity } from '@users/shared/data-access-models';

import * as UsersActions from './users.actions';

export interface UsersState extends EntityState<UserEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: HttpErrorResponse | null;
  usersFilter: { name: string };
}

export const usersAdapter: EntityAdapter<UserEntity> = createEntityAdapter<UserEntity>();

const initialUsersState: UsersState = usersAdapter.getInitialState({
  status: 'init',
  error: null,
  usersFilter: { name: '' },
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const }),
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }) => usersAdapter.removeOne(id, { ...state })),
  on(UsersActions.addUserSuccess, (state, { userData }) => usersAdapter.addOne({ ...userData }, { ...state })),
  on(UsersActions.editUserSuccess, (state, { userData }) =>
    usersAdapter.updateOne(
      {
        id: userData.id,
        changes: userData,
      },
      state,
    ),
  ),
  on(UsersActions.editUserFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.addStoryPoints, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.addStoryPointsSuccess, (state, { userData }) =>
    usersAdapter.updateOne(
      {
        id: userData.id,
        changes: userData,
      },
      { ...state, status: 'loaded' as const },
    ),
  ),

  on(UsersActions.addStoryPointsFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUserSuccess, (state, { userData }) =>
    usersAdapter.addOne({ ...userData }, { ...state, status: 'loaded' as const }),
  ),
  on(UsersActions.loadUserFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.updateUserStatus, (state, { status }) => ({
    ...state,
    status,
  })),
  on(UsersActions.setUsersFilter, (state, { filter }) => ({
    ...state,
    usersFilter: { name: filter.name },
  })),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
