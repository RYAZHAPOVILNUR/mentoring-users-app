import { DeepReadonly } from '@users/core/utils';
import { TFolder } from '../models/folder.type';

export type FolderVM = DeepReadonly<Pick<TFolder, 'id' | 'created_at' | 'title'>>;
