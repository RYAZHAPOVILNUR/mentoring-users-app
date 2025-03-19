import { DeepReadonly } from '@users/core/utils';
import { IFolder } from '../models/folder.model';

export type FolderVM = DeepReadonly<Pick<IFolder, 'id' | 'created_at' | 'title'>>;
