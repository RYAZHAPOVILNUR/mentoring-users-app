import { UserEntity } from '@users/shared/data-access-models';

export interface UserRedirectPayload {
  id: UserEntity['id'];
  editMode: boolean;
}
