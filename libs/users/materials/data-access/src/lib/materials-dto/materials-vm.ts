import { DeepReadonly } from '@users/core/utils';
import { MaterialsEntity } from './materials.entity';

export type MaterialsVM = DeepReadonly<
  Pick<MaterialsEntity, 'id' | 'createdAt' | 'title' | 'materialLink' | 'folderId'>
>;

export { MaterialsEntity };
