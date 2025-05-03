import { DeepReadonly } from '@users/core/utils';
import { FoldersSecondModel } from '../../../../folders-model';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialVM } from '../../../../data-access/src/lib/+state/view-models/material-vm';
import { MaterialsErrors } from '../../../../data-access/src/lib/+state/materials/materials.reducer';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialVM[];
  folder: FoldersSecondModel | null;
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>
