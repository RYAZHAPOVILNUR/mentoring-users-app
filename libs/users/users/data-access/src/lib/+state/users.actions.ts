import { createAction, props } from '@ngrx/store';
import { UsersErrors } from './users.reducer';
import { CreateUserDTO, LoadingStatus, UsersDTO, UsersEntity } from '@users/core/data-access';

export type onSuccessEditionCbType = () => void;

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction('[Users/API] Load Users Success', props<{ users: UsersEntity[] }>());

export const loadUsersFailure = createAction('[Users/API] Load Users Failure', props<{ error: any }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users/Api] Delete User Success', props<{ id: number }>());
export const deleteUserFailed = createAction('[Users/Api] Delete User Failed', props<{ error: any }>());

export const addUser = createAction('[Users Page] Add User', props<{ userData: CreateUserDTO }>());
export const addUserSuccess = createAction('[Users/Api] Add User Success', props<{ userData: UsersEntity }>());
export const addUserFailed = createAction('[Users/Api] Add User Failed', props<{ error: any }>());

// export const selectId = createAction('[Users Page] Select Id', props<{ id: number }>());

// export const deleteSelectedId = createAction('[Users Page] Delete Selected Id');

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
export const loadUserFailed = createAction('[Users/Api] Load User Failed', props<{ error: any }>());

export const updateUserStatus = createAction('[Users Detail] Update User Status', props<{ status: LoadingStatus }>());

export const setUsersFilter = createAction('[Users Page] Set Users Filter', props<{ name: string }>());

// Создать action setUsersFilter который будет принимать
//  данные {filter: {name: string}} (в файле libs/users/users/data-access/src/lib/+state/users.actions.ts)

// В фасаде добавить метод, который будет вызывать диспатч нового экшена

// В редьюсере users.reducer создать новое поле usersFilter: {name: string} в UsersState и в initialUsersState,
//   повесть обработчик экшена setUsersFilter в редьюсере с помощью on, на срабатывание экшена класть данные из
//  этого экшена в state

// Создать селектор usersFilterSelector который будет из стора вытягивать поле usersFilter

// Добавить новый селектор filteredUsers который будет включать в себя два других селектора (usersFilter и allUsers)
//  и на выход будут даваться уже отфильтрованные данные, если фильтр пустой то возвращать всех пользователей

// В фасад libs/users/users/data-access/src/lib/+state/users.facade.ts добавить поле filteredUsers$ и использовать
//  в нем селектор selectFilteredUsers

// В файле libs/users/users/feature-users-list/src/lib/users-list-container/users-list-container.store.ts в методе
//  setUsersFromGlobalToLocalStore заменить this.usersFacade.allUsers$ на this.usersFacade.filteredUsers$

// Подробный разбор задачи (на крайний случай, если никак не получается) - https://youtu.be/vKEvPr6Z7bQ?si=016tCxz_H1Od0abQ