import { FoldersEntity } from './data-access/src';
import { FoldersVM } from './folders-vm';

type FoldersVMAdapter = {
  entityToVM(entity: FoldersEntity): FoldersVM;
};

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({ id, title, createdAt }) {
    return { id, title, createdAt };
  },
};
