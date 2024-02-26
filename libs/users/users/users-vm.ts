import { UsersEntity } from '../../core/data-access/src';
import { DeepReadonly } from '../../core/utils/src';

export type UsersVM = DeepReadonly<
  Pick<UsersEntity, 'id' | 'name' | 'username' | 'email' | 'isAdmin' | 'photo'>
>;
