import { DeepReadonly } from "@users/core/utils";
import { UsersVM } from "../../../../users-vm";
import { UsersErrors } from "@users/users/data-access";
import { LoadingStatus } from "@users/core/data-access";

export type UsersListVM = DeepReadonly<{
  users: UsersVM[],
  status: LoadingStatus,
  errors: UsersErrors | null
}>