import { UsersDTO,Role} from "./users-dto.model"
import { UsersEntity } from "./users.entity"

type UsersDTOAdapter = {
  DTOtoEntity(dto: UsersDTO): UsersEntity,
  entityToDTO(entity: UsersEntity): UsersDTO
}

export const usersDTOAdapter: UsersDTOAdapter = {
  DTOtoEntity(dto) {
    const { role, ...otherAddressFields } = dto

    return {
      ...otherAddressFields,
      isAdmin: role === Role.Admin,
    }
  },
  entityToDTO(entity) {
    const { isAdmin, ...otherFields } = entity;

    return {
      ...otherFields,
      role: isAdmin ? Role.Admin : Role.User,
      // Поля ниже добавлять только при работе со СТАРЫМИ юзерами.
      // purchaseDate: new Date().toString(),
      // educationStatus: 'trainee',
      purchaseDate: new Date().toString(),
      educationStatus: 'trainee'
    };
  }
}
