import { DeepReadonly } from '@users/core/utils'

export type UsersDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  role: 'admin' | 'user'
}>


export type CreateUserDTO = DeepReadonly<{
  id?: number | null;
  name: string;
  username?: string;
  email: string;
  city?: string;
  role?: 'admin' | 'user'
}>

