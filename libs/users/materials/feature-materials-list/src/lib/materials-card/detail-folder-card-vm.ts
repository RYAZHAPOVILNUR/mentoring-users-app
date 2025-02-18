import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersEntity, FoldersErrors } from '@users/materials/data-access';

export type DetailFolderCardVm = DeepReadonly<{
  status: LoadingStatus;
  folder: FoldersEntity | null;
  errors: FoldersErrors | null;
}>;
