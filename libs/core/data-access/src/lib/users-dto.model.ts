import { DeepReadonly } from '@users/core/utils';
export enum Role {
  Admin = 'admin',
  User = 'user',
  Mentor = 'mentor',
}
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
  totalStoryPoints: number | null;
  photo?: UsersPhoto | null;
}>;

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
  totalStoryPoints?: number | null;
}>;

export type UsersPhoto = {
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
