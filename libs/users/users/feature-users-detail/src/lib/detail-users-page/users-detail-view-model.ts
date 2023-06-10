import { DeepReadonly } from "@users/core/utils";
import {CreateUserDTO, UsersStatus} from "@users/users/data-access";

export type UsersDetailVM = DeepReadonly<{
  user: CreateUserDTO;
  status: UsersStatus;
}>
