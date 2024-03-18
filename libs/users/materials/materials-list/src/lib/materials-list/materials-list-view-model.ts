import { DeepReadonly } from '@users/core/utils';
import { MaterialsStatus } from '@users/materials/data-access';
import { MaterialDTO, FolderDTO } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialDTO[],
  status: MaterialsStatus,
  revealedFolder?: FolderDTO
}>
