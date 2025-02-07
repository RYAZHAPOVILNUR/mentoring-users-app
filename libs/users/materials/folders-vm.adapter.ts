import { FoldersEntity } from '../../core/data-access/src';
import { FoldersVM } from './folders-vm';

type FoldersVMAdapter = {
  entityToVM(entity: FoldersEntity): FoldersVM;
};

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM(FoldersEntity) {
    return FoldersEntity;
  },
};
