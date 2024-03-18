import { DeepReadonly } from '@users/core/utils';
import { FolderDTO } from '@users/materials/data-access';
import { MaterialsStatus } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FolderDTO[],
  status: MaterialsStatus,
  error: any
}>
