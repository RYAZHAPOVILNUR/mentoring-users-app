import { LoadingStatus } from '@shared/util-store';
import { Folder } from '@users/materials/data-access-folders';

export interface FoldersListVM {
  folders: Folder[];
  status: LoadingStatus;
  error: string | null;
}
