import { Role } from '../enums/role.enum';
import { UserDTO } from '../types/user-dto.type';
import { UserEntity } from '../types/user-entity.type';
import { UserVM } from '../types/user-vm.type';

type UsersAdapter = {
  DTOtoEntity(dto: UserDTO): UserEntity;
  entityToDTO(entity: UserEntity): UserDTO;
  entityToVM(entity: UserEntity): UserVM;
};

export const userAdapter: UsersAdapter = {
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
  entityToVM({ id, name, username, email, isAdmin, photo }) {
    return { id, name, username, email, isAdmin, photo };
  },
};
