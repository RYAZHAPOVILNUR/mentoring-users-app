import { DeepReadonly } from "@users/core/utils";
import { UsersVM } from "../../../../users-vm";
import { UsersErrors, UsersStatus } from "@users/users/data-access";

export type UsersListVM = DeepReadonly<{
  users: UsersVM[],
  status: UsersStatus,
  errors: UsersErrors | null
}>