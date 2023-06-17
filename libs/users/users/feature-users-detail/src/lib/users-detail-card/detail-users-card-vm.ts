import { LoadingStatus } from "@users/core/data-access"
import {UsersEntity, UsersErrors} from "@users/users/data-access"

export type DetailUsersCardVm = {
  editMode: boolean,
  status: LoadingStatus,
  user: UsersEntity | null,
  errors: UsersErrors | null
}
