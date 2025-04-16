import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsErrors, MaterialsVM } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
