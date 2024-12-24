import { FoldersType } from '../data-access/src/lib/models/folder.type';
import { FoldersVM } from './folders-vm';

type FoldersVMAdapter = {
  entityToVM(entity: FoldersType): FoldersVM;
};

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({ id, created_at, title }) {
    return { id, created_at, title };
  },
};