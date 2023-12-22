import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from '@users/core/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { setUsersFilter } from './users.actions';
export interface State{
  usersFilter:{name:string};
}
export const initialState:State = {
  usersFilter:{name:''},
};

// убери ts-ignore,двух местах у меня выдаёт ошибку что здесь что в самом внизу у тебя,я не знаю в чем проблема
// @ts-ignore
export const usersReducer = createReducer(
  initialState,
  on(setUsersFilter, (state: State, { filter }) => ({ ...state, usersFilter: filter }))
);

const usersFilterSelector = (state:State) => {
  return state.usersFilter;
};
const allUsers =[
{ name: 'User1', age: 25 },
{ name: 'User2', age: 30 },
{ name: 'User3', age: 22 },
];

const simpleFilter = (users: any[], filter: string) => {
  return users.filter(user => user.name.includes(filter));
};

const result = simpleFilter(allUsers, "User");
console.log(result);

export const USERS_FEATURE_KEY = 'users';

export type UsersErrors = {
  status: number,
  [key: string]: unknown
}

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: UsersErrors | null;
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
    status: 'loading' as const
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }) =>
    usersAdapter.removeOne(id, { ...state })
  ),
  on(UsersActions.addUserSuccess, (state, { userData }) =>
    usersAdapter.addOne({ ...userData }, { ...state })
  ),
  on(UsersActions.editUserSuccess, (state, {userData}) => usersAdapter.updateOne({
      id: userData.id,
      changes: userData
    }, state)
  ),
  on(UsersActions.editUserFailed, (state, {error}) => ({
    ...state, status: 'error' as const, error
  })),
  on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(UsersActions.loadUserSuccess, (state, { userData }) =>
    usersAdapter.addOne({ ...userData }, { ...state, status: 'loaded' as const })),
  on(UsersActions.loadUserFailed, (state, {error}) => ({
    ...state,
    status: 'error' as const, error
  })),
  on(UsersActions.updateUserStatus, (state, {status}) => ({
    ...state, status
  })),
);


// @ts-ignore
export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
