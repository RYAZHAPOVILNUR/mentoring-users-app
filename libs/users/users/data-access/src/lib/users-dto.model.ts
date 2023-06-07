import { DeepReadonly } from '@users/core/utils'

export type UsersDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  created_at?: number;
}>


export type CreateUserDTO = DeepReadonly<{
  id?: number;
  name: string;
  username?: string;
  email: string;
  city?: string;
  created_at?: number;
}>

