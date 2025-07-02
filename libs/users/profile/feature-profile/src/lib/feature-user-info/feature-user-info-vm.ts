import { LoadingStatus } from '@shared/util-store';
import { UsersEntity } from '@users/core/data-access-models';

export type ProfileFormVm = {
  user: UsersEntity;
  githubUserName?: string;
  githubStatus?: LoadingStatus;
  isLoggedUser: boolean;
};
