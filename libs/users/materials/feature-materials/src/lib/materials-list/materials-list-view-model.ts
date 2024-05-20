import { LoadingStatus } from '@users/core/data-access';
import { Material } from '@users/materials/data-access';

export type MaterialsListVM = {
  materials: Material[];
  status: LoadingStatus;
  errors: unknown | string | null;
};
