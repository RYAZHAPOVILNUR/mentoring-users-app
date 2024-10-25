import { DeepReadonly } from '@users/core/utils';
import { MaterialsVM } from '@users/materials';

export type MaterialsListVM = DeepReadonly<{ materials: MaterialsVM[] }>;
