import { LoadingStatus, UsersEntity } from '@users/core/data-access';

export type ProfileFormVm = {
  user: UsersEntity;
  githubUserName?: string;
  githubStatus?: LoadingStatus;
  isLoggedUser: boolean;
};
