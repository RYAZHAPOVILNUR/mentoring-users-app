import { DeepReadonly } from '@users/core/utils';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVm = DeepReadonly<{
  folders: IFolder[],
  status: LoadingStatus
}>
