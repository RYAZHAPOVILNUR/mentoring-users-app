import { UsersEntity } from '@users/core/data-access-models';

import { UsersVM } from './users-vm';

type UsersVMAdapter = {
  entityToVM(entity: UsersEntity): UsersVM;
};

export const usersVMAdapter: UsersVMAdapter = {
  entityToVM({ id, name, username, email, isAdmin, photo }) {
    return { id, name, username, email, isAdmin, photo };
  },
};
