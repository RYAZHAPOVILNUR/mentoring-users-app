import { UsersEntity, UsersStatus } from "@users/users/data-access"

export type DetailUsersCardVm = {
  editMode: boolean,
  status: UsersStatus,
  user: UsersEntity | null
}