import { UsersEntity } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";

export type UsersVM = DeepReadonly<
  Pick<UsersEntity, "id" | "name" | "username" | "email" | "isAdmin">
>
