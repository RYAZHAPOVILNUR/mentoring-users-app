import { DeepReadonly } from "@users/core/utils";
import { UsersVM } from "../users-vm";

export type UsersListVM = DeepReadonly<{
  users: UsersVM[]
}>