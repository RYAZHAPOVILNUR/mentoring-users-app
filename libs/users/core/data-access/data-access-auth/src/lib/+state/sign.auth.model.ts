import { DeepReadonly } from '@shared/util-typescript';
import { UserDTO, UserEntity } from '@users/core/data-access-models';

export interface SignAuthPayload {
  email: string;
  password: string;
}

export interface SignAuthResponse {
  authToken: string;
  user: UserDTO;
}

export interface SignAuthUser {
  authToken: string;
  user: UserEntity;
}

export interface RegisterResponse {
  authToken: string;
}

export interface ChangeProfileDataResponse {
  message: string;
}

export type LoggedInUserDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  role: 'admin' | 'user';
}>;

export type LoggedInUserEntity = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  isAdmin: boolean;
}>;

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}
export interface ChangeProfileDataPayload {
  name?: string;
  city?: string;
  email?: string;
}
