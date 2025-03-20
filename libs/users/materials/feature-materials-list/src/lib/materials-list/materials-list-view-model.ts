import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { IFolder, IMaterial, MaterialsErrors } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  folder: IFolder | null;
  materials: IMaterial[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
