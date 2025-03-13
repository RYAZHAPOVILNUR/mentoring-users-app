import { FoldersVM } from './folders-vm';
import { FoldersEntity } from './folders.entity';

type FoldersVMAdapter = {
  entityToVM(entity: FoldersEntity): FoldersVM;
};

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({ id, title, createdAt }) {
    return { id, title, createdAt: createdAt };
  },
};
