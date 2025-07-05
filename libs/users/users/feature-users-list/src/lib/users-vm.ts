import { DeepReadonly } from '@shared/util-typescript';
import { UsersEntity } from '@users/core/data-access-models';

export type UsersVM = DeepReadonly<Pick<UsersEntity, 'id' | 'name' | 'username' | 'email' | 'isAdmin' | 'photo'>>;
