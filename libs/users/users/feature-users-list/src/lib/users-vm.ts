import { UsersEntity } from '@users/core/data-access-models';
import { DeepReadonly } from '@users/core/utils';

export type UsersVM = DeepReadonly<Pick<UsersEntity, 'id' | 'name' | 'username' | 'email' | 'isAdmin' | 'photo'>>;
