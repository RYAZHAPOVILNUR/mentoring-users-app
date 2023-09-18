import { UsersDTO, UsersEntity } from "@users/core/data-access"
import { DeepReadonly } from "@users/core/utils"

export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  authToken: string,
  user: UsersDTO
}

export interface SignAuthUser {
  authToken: string,
  user: UsersEntity
}

export interface RegisterResponse {
  authToken: string
}

export type LoggedInUserDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  role: 'admin' | 'user'
}>

export type LoggedInUserEntity = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  isAdmin: boolean;
}>

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
}


export interface ChangeNamePayload {
  newName: string
}

export interface ChangePasswordResponse {
  message: string
}

export interface ChangeNameResponse {
  message: string
}