import { UsersEntity } from "./+state/users.entity"
import { UsersDTO } from "./users-dto.model"

type UsersDTOAdapter = {
  DTOtoEntity(dto: UsersDTO): UsersEntity,
  entityToDTO(entity: UsersEntity): UsersDTO
}

export const usersDTOAdapter: UsersDTOAdapter = {
  DTOtoEntity(dto) {
    const { role, ...otherAddressFields } = dto

    return {
      ...otherAddressFields,
      isAdmin: role === 'admin' ? true : false,
    }
  },
  entityToDTO(entity) {
    const { isAdmin, ...otherFields } = entity;

    return {
      ...otherFields,
      role: isAdmin ? 'admin' : 'user',
    };
  }
}
