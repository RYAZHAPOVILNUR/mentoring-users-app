import { LoadingStatus } from '@users/core/data-access';
import { Folder, FoldersErrors } from '@users/materials/data-access';

export type FoldersListVM = {
  folders: Folder[];
  status: LoadingStatus;
  errors: FoldersErrors | string | null;
};
