import { Role } from '@users/core/data-access-models';
import { DeepReadonly } from '@users/core/utils';

export type CreateUserDTO = DeepReadonly<{
  id?: number | null;
  name: string;
  username?: string;
  email: string;
  city?: string;
  role?: Role;
  purchaseDate: string;
  educationStatus: string;
  educationTime?: number;
  totalStoryPoints?: number;
}>;
