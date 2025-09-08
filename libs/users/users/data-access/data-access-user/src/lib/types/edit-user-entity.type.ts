import { EditUserDTO } from './edit-user-dto.type';

export type EditUserEntity = Omit<EditUserDTO, 'role'> & {
  isAdmin?: boolean | null;
};
