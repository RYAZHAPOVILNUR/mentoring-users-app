import { MaterialsErrors, Material, Folder } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';

export type MaterialsListVM = DeepReadonly<{
  materials: Material[];
  openedFolder: Folder | null,
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
