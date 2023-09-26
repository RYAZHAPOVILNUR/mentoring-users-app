import { LoadingStatus, UsersEntity } from "@users/core/data-access"

export type ProfileFormVm = {
  user:UsersEntity,
  status: string,
  isMyProfile: boolean,
  githubUserName?: string;
  githubStatus?: LoadingStatus;
  isLoggedUser: boolean;
}
