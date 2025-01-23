import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsErrors } from '../../+state/materials.reducer';
import { TFoldersVM } from './folders-vm.type';

export type TFoldersListVm = DeepReadonly<{
  folders: TFoldersVM[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
