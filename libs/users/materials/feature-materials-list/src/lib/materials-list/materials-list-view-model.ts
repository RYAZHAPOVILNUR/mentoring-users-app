import { LoadingStatus } from '@users/core/data-access';
import { Material, MaterialsErrors } from '@users/materials/data-access';

export type MaterialsListVM = {
  materials: Material[];
  status: LoadingStatus;
  errors: MaterialsErrors | string | null;
};
