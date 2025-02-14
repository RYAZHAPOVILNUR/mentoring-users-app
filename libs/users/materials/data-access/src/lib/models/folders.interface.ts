import { LoadingStatus } from '@users/core/data-access';
import { FoldersErrors } from '../folders/+state/folders.reducer';

export type FoldersDTO = {
  id: number;
  created_at: number;
  title: string;
};

export type CreateFolderDTO = {
  title: string;
};

export type FoldersEntity = {
  id: number;
  created_at: number;
  title: string;
};

export type FoldersVM = {
  id: number;
  created_at: number;
  title: string;
};

export type FoldersListVM = {
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
};
