/**
 * Interface for the 'Users' data
 */

import { UsersDTO } from "../users-dto.model";

export type UsersEntity = Omit<UsersDTO, 'address'> & {
  address: Omit<UsersDTO['address'], 'geo'>
}
