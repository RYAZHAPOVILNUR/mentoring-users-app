import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus } from '@users/core/data-access';
import { TFolderError } from './folder-error.model';
import { TFolderVM } from './folder-vm.model';

export type TFoldersListVM = DeepReadonly<{
  folders: TFolderVM[];
  status: LoadingStatus;
  errors: TFolderError | null;
}>;
