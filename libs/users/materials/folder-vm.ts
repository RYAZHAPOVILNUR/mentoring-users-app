
import { FolderEntity } from '../../core/data-access/src';
import { DeepReadonly } from '../../core/utils/src';

export type FoldersVM = DeepReadonly<Pick<FolderEntity, 'id' | 'title' | 'created_at' | 'typeFolder' | 'isOwn' >>;
