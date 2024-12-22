import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { LoadingStatus, UsersEntity } from '@users/core/data-access';
import * as UsersActions from './users.actions';
import { setUsersFilter } from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export type UsersErrors = {
  status: number;
  [key: string]: unknown;
};

export type UsersFilter = {
  name: string;
};

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: UsersErrors | null;
  usersFilter: UsersFilter;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> = createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  error: null,
  usersFilter: {
    name: '',
  },
});

const reducer = createReducer(
  initialUsersState,
  on(setUsersFilter, (state, { filter }) => ({
    ...state,
    usersFilter: {
      ...state.usersFilter,
      ...filter,
    },
  })),
  on(UsersActions.initUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const })
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
      state
    )
  ),
  on(UsersActions.editUserFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUserSuccess, (state, { userData }) =>
    usersAdapter.addOne({ ...userData }, { ...state, status: 'loaded' as const })
  ),
  on(UsersActions.loadUserFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.updateUserStatus, (state, { status }) => ({
    ...state,
    status,
  }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
