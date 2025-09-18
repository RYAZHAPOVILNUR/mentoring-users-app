import { LoadingStatus } from '@shared/util-store';
import { Folder } from '@users/materials/data-access-folders';
import { Material } from '@users/materials/data-access-materials';

export interface MaterialsListVM {
  materials: Material[];
  status: LoadingStatus;
  error: string | null;
  openedFolder: Folder | null | undefined;
}
