import { UsersEntity } from '../../../core/data-access/src';
import { UsersVM } from '../../users/users-vm';
import { FoldersModel } from '../folders-model';
import { FoldersVM } from '../folders-vm';

type FoldersVMAdapter = {
  entityToVM(entity: FoldersModel): FoldersVM;
};

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({ title, create_at, id, }) {
    return { title, create_at, id };
  },
};
