import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsErrors } from '@users/data-access';
import { MaterialsVM } from '../../../../materials-vm';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>
