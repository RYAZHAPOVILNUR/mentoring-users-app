import { LoadingStatus } from '@users/core/data-access';
import { FolderType } from '@users/materials/data-access';

export type FolderListVM = {
  allFolders: FolderType[];
  foldersStatus: LoadingStatus;
};
