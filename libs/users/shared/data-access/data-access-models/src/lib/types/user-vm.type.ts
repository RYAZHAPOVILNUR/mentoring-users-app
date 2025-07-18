import { DeepReadonly } from '@shared/util-typescript';

import { UserEntity } from './user-entity.type';

export type UserVM = DeepReadonly<Pick<UserEntity, 'id' | 'name' | 'username' | 'email' | 'isAdmin' | 'photo'>>;
