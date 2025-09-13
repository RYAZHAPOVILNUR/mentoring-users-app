import { DeepReadonly } from '@shared/util-typescript';
import { Role } from '@users/shared/data-access-models';

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
