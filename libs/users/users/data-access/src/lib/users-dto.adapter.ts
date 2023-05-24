import { UsersEntity } from "./+state/users.models"
import { UsersDTO } from "./users-dto.model"

type UsersDTOAdapter = {
  DTOtoEntity(dto: UsersDTO): UsersEntity,
  entityToDTO(entity: UsersEntity): UsersDTO
}

export const usersDTOAdapter: UsersDTOAdapter = {
  DTOtoEntity(dto) {
    const { geo, ...otherAddressFields } = dto.address

    return {
      ...dto,
      address: {
        ...otherAddressFields
      }
    }
  },
  entityToDTO(entity) {
    return {
      ...entity,
      address: {
        ...entity.address,
        geo: {lat: '', lng: ''}
      }
    }
  }
}