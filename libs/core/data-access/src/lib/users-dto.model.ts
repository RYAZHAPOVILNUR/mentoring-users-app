import { DeepReadonly } from '@users/core/utils'

export type UsersDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  role: 'admin' | 'user';
  photo?: UsersPhoto | null
}>


export type CreateUserDTO = DeepReadonly<{
  id?: number | null;
  name: string;
  username?: string;
  email: string;
  city?: string;
  role?: 'admin' | 'user'
}>

export type UsersPhoto = {
  path: string,
  name: string,
  type: 'image',
  size: number,
  mime: 'image/jpeg',
  meta: {
    width: number,
    height: number
  },
  url: string
}
