import { LoadingStatus } from '@users/core/data-access';
import { IMaterial } from '@users/materials/data-access';

export type MaterialsListVM = {
  materials: IMaterial[];
  status: LoadingStatus;
};
