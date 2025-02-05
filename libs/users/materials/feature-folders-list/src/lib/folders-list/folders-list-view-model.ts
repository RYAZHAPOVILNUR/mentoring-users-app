import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors } from '@users/data-access';
import { FoldersVM } from '../../../../folders-vm';
import { LoadingStatus } from '@users/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
