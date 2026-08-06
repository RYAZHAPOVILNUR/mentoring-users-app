import { UserEntity } from '@users/shared/data-access-models';

export type UpdateUser = Pick<UserEntity, 'id' | 'totalStoryPoints' | 'isAdmin'>;
