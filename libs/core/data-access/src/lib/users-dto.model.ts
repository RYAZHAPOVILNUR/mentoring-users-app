import { DeepReadonly } from '@users/core/utils'
export enum Role {
  Admin = "admin",
  User = "user",
  Mentor = "mentor"
}
export type UsersDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  role: Role;
  photo?: UsersPhoto | null
  totalStoryPoints?: number
}>


export type CreateUserDTO = DeepReadonly<{
  id?: number | null;
  name: string;
  username?: string;
  email: string;
  city?: string;
  role?: Role;
  totalStoryPoints?: number
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
