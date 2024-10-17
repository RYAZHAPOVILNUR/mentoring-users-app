import { DeepReadonly } from '@users/core/utils';
import { FoldersEntity, MaterialsVM } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM[],
  folder: FoldersEntity | null;
}>;
