import { FoldersErrors } from '@materials/data-access';
import { FolderDTO, LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';

export type FoldersListVM = DeepReadonly<{
  folders: FolderDTO[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
