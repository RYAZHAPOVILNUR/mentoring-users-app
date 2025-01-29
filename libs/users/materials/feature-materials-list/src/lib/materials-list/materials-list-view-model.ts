import { DeepReadonly } from '@users/core/utils';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/materials.model';

export type MaterialsListVM = DeepReadonly<{
  materials: IMaterial[];
}>;
