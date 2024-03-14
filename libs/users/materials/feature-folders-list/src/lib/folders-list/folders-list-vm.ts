import { LoadingStatus } from '@users/core/data-access';
import { IFolder, IMaterial } from '@users/materials/data-access';

export type FolderListVM = {
  folders: IFolder[];
  materials: IMaterial[];
  status: LoadingStatus;
  error: string | null;
};
