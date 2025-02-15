import { FoldersEntity } from './data-access/src';
import { DeepReadonly } from '../../core/utils/src';

export type FoldersVM = DeepReadonly<Pick<FoldersEntity, 'id' | 'title' | 'createdAt'>>;
