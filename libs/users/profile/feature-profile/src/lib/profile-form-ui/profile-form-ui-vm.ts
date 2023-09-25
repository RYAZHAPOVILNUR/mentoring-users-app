import { UsersEntity } from "@users/core/data-access"

export type ProfileFormVm = {
  user:UsersEntity,
  status: string,
  isMyProfile: boolean,
}
