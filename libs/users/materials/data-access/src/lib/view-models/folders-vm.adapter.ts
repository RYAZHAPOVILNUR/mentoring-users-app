import { TFolder } from '../models/folder.type';
import { FolderVM } from './folder-vm';

type FoldersVmAdapter = {
  entityToVM(entity: TFolder): FolderVM;
};

export const FoldersVmAdapter: FoldersVmAdapter = {
  entityToVM({ id, created_at, title }) {
    return { id, created_at, title };
  },
};
