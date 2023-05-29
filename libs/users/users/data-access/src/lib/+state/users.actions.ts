import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.entity';

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: UsersEntity[] }>()
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[Users Page] Delete User',
  props<{id: number}>()
  );
