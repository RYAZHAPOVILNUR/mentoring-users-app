import { DeepReadonly } from '@shared/util-typescript';

import { Role } from '../enums/role.enum';

type UsersPhoto = {
  path: string;
  name: string;
  type: 'image';
  size: number;
  mime: 'image/jpeg';
  meta: {
    width: number;
    height: number;
  };
  url: string;
};

export type UsersDTO = DeepReadonly<{
  id: number;
  name: string;
  email: string;
  username: string;
  city: string;
  role?: Role;
  purchaseDate: string;
  educationStatus: string;
  educationTime?: number;
  totalStoryPoints?: number;
  photo?: UsersPhoto | null;
}>;
