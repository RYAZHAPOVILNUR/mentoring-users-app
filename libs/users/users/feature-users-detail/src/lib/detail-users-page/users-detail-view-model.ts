import { DeepReadonly } from "@users/core/utils";
import {UsersEntity, UsersStatus} from "@users/users/data-access";

export type UsersDetailVM = DeepReadonly<{
  user: UsersEntity | null;
  status: UsersStatus;
}>
