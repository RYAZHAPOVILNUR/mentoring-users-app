import { LoadingStatus, UsersEntity } from '@users/core/data-access';
import { UsersErrors } from '@users/users/data-access';

export type DetailUsersCardVm = {
  editMode: boolean;
  status: LoadingStatus;
  user: UsersEntity | null;
  errors: UsersErrors | null;
};
