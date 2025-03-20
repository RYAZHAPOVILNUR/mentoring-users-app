import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors, IFolder } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: IFolder[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;