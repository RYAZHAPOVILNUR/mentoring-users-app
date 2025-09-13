import { DeepReadonly } from '@shared/util-typescript';

import { MaterialEntity } from './material-entity.type';

export type MaterialVM = DeepReadonly<
  Pick<MaterialEntity, 'title' | 'materialLink' | 'folderId' | 'id' | 'created_at'>
>;
