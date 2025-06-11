import { CreateUserDTO, LoadingStatus, UsersEntity } from '@users/core/data-access';
import { onSuccessEditionCbType, UsersErrors } from '@users/users/data-access';

export type EditUserData = Partial<Pick<UsersEntity, 'name' | 'username' | 'city' | 'email'| 'totalStoryPoints'>>

export type DetailUsersCardVm = {
  isEditUser: boolean,
  isEditPoints: boolean,
  status: LoadingStatus;
  user: UsersEntity | null;
  errors: UsersErrors | null;
};

export const INITIAL_USER_CONFIG: DetailUsersCardVm = {
  isEditUser: false,
  isEditPoints: false,
  user: null,
  status: 'init',
  errors: null,
}

export type QueryParamsConfig = {
  isEditUser: boolean,
  isEditPoint: boolean,
}

export type EditParams = {
  user: EditUserData;
  onSuccessCb: onSuccessEditionCbType;
}


