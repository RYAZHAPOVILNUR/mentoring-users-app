import { DeepReadonly } from '@users/core/utils';
import { FoldersVm } from '../../../../folders-vm';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersErrors } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVm[],
  status: LoadingStatus,
  errors: FoldersErrors | null,
}>
