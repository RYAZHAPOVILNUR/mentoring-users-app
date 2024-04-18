import { DeepReadonly } from '@users/core/utils';
import { FolderDTO, MaterialDTO, MaterialsStatus } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FolderDTO[];
  error: string | null;
  status: MaterialsStatus;
}>;

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialDTO[];
  error: string | null;
  status: MaterialsStatus;
}>;
