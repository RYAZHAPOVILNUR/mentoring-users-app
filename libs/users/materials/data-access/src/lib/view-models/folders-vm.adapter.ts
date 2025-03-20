import { IFolder } from '../models/folder.model';
import { FolderVM } from './folder-vm';

type FoldersVmAdapter = {
  entityToVM(entity: IFolder): FolderVM;
};

export const FoldersVmAdapter: FoldersVmAdapter = {
  entityToVM({ id, created_at, title }) {
    return { id, created_at, title };
  },
};
