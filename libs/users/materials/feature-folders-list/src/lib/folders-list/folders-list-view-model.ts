import { LoadingStatus } from '@users/core/data-access';
import { FoldersErrors } from '@users/materials/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FolderVM } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FolderVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
