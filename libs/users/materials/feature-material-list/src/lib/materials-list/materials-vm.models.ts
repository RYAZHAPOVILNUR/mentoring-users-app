import { LoadingStatus } from '@users/core/data-access';
import { MaterialsVM } from '../../../../vm/materials-vm';

export type MaterialsListVM = {
  materials: MaterialsVM[];
  status: LoadingStatus;
};
