import { FoldersEntity } from './data-access/src';
import { FoldersVM } from './folders-vm';

export type FoldersVMAdapter = {
  entityToVM(entity: FoldersEntity): FoldersVM
}

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({ id, title, created_at }) {
    return {
      id,
      title,
      createdAt: created_at
    } as FoldersVM;
  }
};
