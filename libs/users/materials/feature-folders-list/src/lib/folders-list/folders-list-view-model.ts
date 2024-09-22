import { Folder, MaterialsErrors } from '@users/materials/data-access';
import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListViewModel = DeepReadonly<{
  folders: Folder[];
  status: LoadingStatus,
  errors: MaterialsErrors | null
}>
