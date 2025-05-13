import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsErrors } from 'libs/users/materials/data-access/src/lib/+state-materials/materials.reducer';
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folders.type';
import { MaterialsType } from 'libs/users/materials/data-access/src/lib/models/materials.type';

export type materialsListVM = DeepReadonly<{
  openMaterial: MaterialsType[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
  openFolder: FoldersType | null;
}>;
