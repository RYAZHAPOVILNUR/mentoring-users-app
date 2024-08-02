import { LoadingStatus } from '@users/core/data-access';
import { FolderType, MaterialType } from '@users/materials/data-access';

export type MaterialListVM = {
  openedMaterial: MaterialType[];
  materialsStatus: LoadingStatus;
  openedFolder: FolderType | null;
};
