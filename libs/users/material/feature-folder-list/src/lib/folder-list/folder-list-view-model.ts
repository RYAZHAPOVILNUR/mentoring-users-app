import { Errors, LoadingStatus } from '@users/core/data-access';
import { Folder } from '@users/material';

export type FolderListVM = {
  folders: Folder[];
  status: LoadingStatus;
  errors: Errors | null;
};
