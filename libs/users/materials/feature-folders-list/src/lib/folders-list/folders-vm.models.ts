import { LoadingStatus } from '@users/core/data-access';
import { FoldersVM } from '../../../../vm/folders-vm';

export type FolderListVM = {
  folders: FoldersVM[];
  status: LoadingStatus;
};
