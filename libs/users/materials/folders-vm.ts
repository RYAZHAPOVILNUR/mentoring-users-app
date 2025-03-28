import { DeepReadonly } from '../../core/utils/src';
import { FoldersModel } from './folders-model';

export type FoldersVM = DeepReadonly<Pick<FoldersModel, 'id' | 'create_at' | 'title'>>
