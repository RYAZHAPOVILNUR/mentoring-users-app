import { DeepReadonly } from '../../core/utils/src';
import { FoldersEntity } from './data-access/src';

export type FoldersVM = DeepReadonly<Pick<
  FoldersEntity,
  'id' | 'title' | 'created_at'> & { createdAt: FoldersEntity['created_at']
}>;
