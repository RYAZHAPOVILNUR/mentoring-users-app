import { DeepReadonly } from '@users/core/utils';
import { MaterialsVM } from '../../../../materials-vm';
import { MaterialsErrors } from '@libs/users/materials/state';
import { LoadingStatus } from '@users/core/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM[];
  folderId: number | undefined;
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
