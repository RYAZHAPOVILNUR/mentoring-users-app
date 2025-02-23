import { DeepReadonly } from '../../core/utils/src';
import { MaterialsEntity } from '../../core/data-access/src';

export type MaterialsVM = DeepReadonly<
  Pick<MaterialsEntity, 'createdAt' | 'title' | 'materialLink' | 'id' | 'folderId' | 'materialFormat'>
>;
