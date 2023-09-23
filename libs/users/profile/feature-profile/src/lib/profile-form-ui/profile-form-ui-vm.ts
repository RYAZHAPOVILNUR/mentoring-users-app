import { UsersEntity } from "@users/core/data-access"

export type ProfileFormVm = {
  user:UsersEntity,
  githubUserName?: string;
}
