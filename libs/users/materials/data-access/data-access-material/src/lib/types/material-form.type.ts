import { DeepReadonly } from '@shared/util-typescript';

import { MaterialEntity } from './material-entity.type';

export type MaterialFormData = DeepReadonly<Pick<MaterialEntity, 'title' | 'materialLink'>>;
