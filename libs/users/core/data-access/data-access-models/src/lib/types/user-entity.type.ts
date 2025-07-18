import { UserDTO } from './user-dto.type';

export type UserEntity = Omit<UserDTO, 'role'> & {
  isAdmin: boolean | null;
};
