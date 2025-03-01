import { DeepReadonly } from '@users/core/utils';
import { FolderDTO } from '@users/materials/data-access';
import { FoldersErrors } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FolderDTO[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
