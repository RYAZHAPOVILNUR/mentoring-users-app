import { DeepReadonly } from '@users/core/utils';
import { Folder } from '../../../../data-access/src/lib/models/folder.models';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVm = DeepReadonly<{
  folders: Folder[],
  status: LoadingStatus
}>
