import { DeepReadonly } from '../../../core/utils/src';
import { FoldersType } from '../data-access/src/lib/models/folder.type';

export type FoldersVM = DeepReadonly<Pick<FoldersType, 'id' | 'created_at' | 'title'>>;
