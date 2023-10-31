import { DeepReadonly } from "@users/core/utils";
import { UsersVM } from "../../../../users-vm";
import { UsersErrors, UsersFilter } from "@users/users/data-access";
import { LoadingStatus, UsersEntity } from "@users/core/data-access";

export type UsersListVM = DeepReadonly<{
  users: UsersVM[],
  status: LoadingStatus,
  errors: UsersErrors | null,
  loggedUser: UsersEntity,
  filterParams: UsersFilter
}>
