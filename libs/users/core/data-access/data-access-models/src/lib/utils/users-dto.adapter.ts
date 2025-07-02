import { Role } from '../enums/role.enum';
import { UsersDTO } from '../types/users-dto.type';
import { UsersEntity } from '../types/users-entity.type';

type UsersDTOAdapter = {
  DTOtoEntity(dto: UsersDTO): UsersEntity;
  entityToDTO(entity: UsersEntity): UsersDTO;
};

export const usersDTOAdapter: UsersDTOAdapter = {
  DTOtoEntity(dto) {
    const { role, ...otherAddressFields } = dto;

    return {
      ...otherAddressFields,
      isAdmin: role === Role.Admin,
    };
  },
  entityToDTO(entity) {
    const { isAdmin, ...otherFields } = entity;

    return {
      ...otherFields,
      role: isAdmin ? Role.Admin : Role.User,
      // Поля ниже добавлять только при работе со СТАРЫМИ юзерами.
      // purchaseDate: new Date().toString(),
      // educationStatus: 'trainee',
    };
  },
};
