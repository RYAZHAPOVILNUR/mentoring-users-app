/**
 * Interface for the 'Users' data
 */

import { UsersDTO } from './users-dto.model';

export type UsersEntity = Omit<UsersDTO, 'role'> & {
  isAdmin: boolean | null;
};

export type UsersFilter = {
  name: string;
};
