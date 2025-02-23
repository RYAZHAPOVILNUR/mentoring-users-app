import { DeepReadonly } from '@users/core/utils';
import { FoldersVM } from '../../../../folders-vm';
import { FoldersErrors } from '@libs/users/materials/state';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
