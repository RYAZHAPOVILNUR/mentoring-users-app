import { DeepReadonly } from '@users/core/utils';
import { MaterialDTO, MaterialsStatus, FolderDTO } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialDTO[],
  openedFolder?: FolderDTO,
  status: MaterialsStatus,
  error: any
}>
