import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';
import { Callback } from '@shared/util-typescript';
import { UserDTO, UserEntity } from '@users/shared/data-access-models';

import { CreateUserDTO } from '../types/create-user-dto.type';

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction('[Users/API] Load Users Success', props<{ users: UserEntity[] }>());

export const loadUsersFailure = createAction('[Users/API] Load Users Failure', props<{ error: HttpErrorResponse }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users/Api] Delete User Success', props<{ id: number }>());
export const deleteUserFailed = createAction('[Users/Api] Delete User Failed', props<{ error: HttpErrorResponse }>());

export const addUser = createAction('[Users Page] Add User', props<{ userData: CreateUserDTO }>());
export const addUserSuccess = createAction('[Users/Api] Add User Success', props<{ userData: UserEntity }>());
export const addUserFailed = createAction('[Users/Api] Add User Failed', props<{ error: HttpErrorResponse }>());
export const setUsersFilter = createAction('[Users] Set users Filter', props<{ filter: { name: string } }>());
// export const selectId = createAction('[Users Page] Select Id', props<{ id: number }>());

// export const deleteSelectedId = createAction('[Users Page] Delete Selected Id');

export const editUser = createAction(
  '[Users Detail] Edit User',
  props<{
    userData: CreateUserDTO;
    id: number;
    onSuccessCb: Callback;
  }>(),
);
export const editUserSuccess = createAction('[Users Detail] Edit User Success', props<{ userData: UserDTO }>());
export const editUserFailed = createAction('[Users Detail] Edit Failed', props<{ error: HttpErrorResponse | null }>());

export const loadUser = createAction('[Users Page] Load User');
export const loadUserSuccess = createAction('[Users/Api] Load User Success', props<{ userData: UserEntity }>());
export const loadUserFailed = createAction('[Users/Api] Load User Failed', props<{ error: HttpErrorResponse }>());

export const updateUserStatus = createAction('[Users Detail] Update User Status', props<{ status: LoadingStatus }>());
