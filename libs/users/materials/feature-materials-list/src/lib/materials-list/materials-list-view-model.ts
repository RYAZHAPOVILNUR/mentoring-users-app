import { DeepReadonly } from '@users/core/utils';
import { MaterialsVM } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM[];
}>;
