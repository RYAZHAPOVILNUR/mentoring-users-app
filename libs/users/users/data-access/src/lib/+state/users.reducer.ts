import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.entity';

export const USERS_FEATURE_KEY = 'users';

export type UsersStatus = 'init' | 'loading' | 'loaded' | 'error'

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number; // which Users record has been selected
  status: UsersStatus;
  error: string | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  error: null
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }) =>
    usersAdapter.removeOne(id, { ...state })
  ),
  on(UsersActions.addUserSuccess, (state, { userData }) =>
    usersAdapter.addOne({ ...userData }, { ...state })
  ),
  on(UsersActions.editUserSuccess, (state, { userData }) => usersAdapter.updateOne({
    id: userData.id,
    changes: userData
  }, state)),
  on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(UsersActions.loadUserSuccess, (state, { userData }) =>
    usersAdapter.addOne({ ...userData }, { ...state, status: 'loaded' })),
  on(UsersActions.loadUserFailed, (state) => ({
    ...state,
    status: 'error'
  })),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
