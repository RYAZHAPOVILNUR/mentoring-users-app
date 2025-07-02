import { UsersDTO } from './users-dto.type';

export type UsersEntity = Omit<UsersDTO, 'role'> & {
  isAdmin: boolean | null;
};
