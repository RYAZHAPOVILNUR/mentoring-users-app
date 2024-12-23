import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsErrors } from '@users/materials/data-access';
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folder.type';
import { MaterialsType } from "libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager";

export type materialsListVM = DeepReadonly<{
  openMaterial: MaterialsType[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
  openFolder: FoldersType | null;
}>;