import { createAction, props } from '@ngrx/store';
import { UsersErrors } from './users.reducer';
import { CreateUserDTO, LoadingStatus, UsersDTO, UsersEntity } from '@users/core/data-access';

export type onSuccessEditionCbType = () => void;

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction('[Users/API] Load Users Success', props<{ users: UsersEntity[] }>());

export const loadUsersFailure = createAction('[Users/API] Load Users Failure', props<{ error: UsersErrors | null }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users/Api] Delete User Success', props<{ id: number }>());
export const deleteUserFailed = createAction('[Users/Api] Delete User Failed', props<{ error: UsersErrors | null }>());

export const addUser = createAction('[Users Page] Add User', props<{ userData: CreateUserDTO }>());
export const addUserSuccess = createAction('[Users/Api] Add User Success', props<{ userData: UsersEntity }>());
export const addUserFailed = createAction('[Users/Api] Add User Failed', props<{ error: UsersErrors | null }>());

export const editUser = createAction(
  '[Users Detail] Edit User',
  props<{
    userData: CreateUserDTO;
    id: number;
    onSuccessCb: onSuccessEditionCbType;
  }>()
);
export const editUserSuccess = createAction('[Users Detail] Edit User Success', props<{ userData: UsersDTO }>());
export const editUserFailed = createAction('[Users Detail] Edit Failed', props<{ error: UsersErrors | null }>());

export const loadUser = createAction('[Users Page] Load User');
export const loadUserSuccess = createAction('[Users/Api] Load User Success', props<{ userData: UsersEntity }>());
export const loadUserFailed = createAction('[Users/Api] Load User Failed', props<{ error: UsersErrors | null }>());

export const updateUserStatus = createAction('[Users Detail] Update User Status', props<{ status: LoadingStatus }>());

export const setUsersFilter = createAction('[Users Page] Set Users Filter',props<{ filter: { name: string } }>());

export const updateUserStoryPoints = createAction(
  '[Users] Update Story Points',
  props<{ 
    userId: number;
    totalStoryPoints: number;
    onSuccessCb?: () => void;
  }>()
);

export const updateUserStoryPointsSuccess = createAction(
  '[Users] Update Story Points Success',
  props<{ userData: UsersDTO }>()
);
export const updateUserStoryPointsFailed = createAction(
  '[Users] Update Story Points Failed',
  props<{ error: UsersErrors | null }>()
);