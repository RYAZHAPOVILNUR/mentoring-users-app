/**
 * Interface for the 'Users' data
 */

import { Address, UsersDTO } from "../users-dto.model";

export type UsersEntity = Omit<UsersDTO, 'address'> & {
  address: Omit<Address, 'geo'>
}
