
import { FolderEntity } from '../../core/data-access/src';
import { DeepReadonly } from '../../core/utils/src';

export type FoldersVM = DeepReadonly<Pick<FolderEntity, 'id' | 'name' | 'createAt' | 'typeFolder' | 'isOwn' >>;
