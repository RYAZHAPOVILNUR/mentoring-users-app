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

export const createUser = createAction('[Users Page] Create User', props<{ name: string, username: string, email: string }>());
export const createUserSuccess = createAction('[Users/Api] Create User Success', props<{ name: string, username: string, email: string }>());
export const createUserFailed = createAction('[Users/Api] Create User Success', props<{ error: any }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{id:number}>());
export const deleteUserSuccess = createAction('[Users/Api] Delete User Success', props<{id:number}>());
export const deleteUserFailed = createAction('[Users/Api] Delete User Success', props<{ error: any }>());
