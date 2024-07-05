import { Folder } from './folder.model';
import { Material } from './material.model';
import { LoadingStatus } from '@users/core/data-access';

export type MaterialListVM = {
  materials: Material[];
  materialsStatus: LoadingStatus;
  openedFolder: Folder | null;
}
