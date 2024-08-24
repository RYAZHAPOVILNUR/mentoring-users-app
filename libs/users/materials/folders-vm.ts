import { DeepReadonly } from '@users/core/utils';
import { FolderType } from "./data-access/src/lib/+state/folder.materials.model";

export type FoldersVM = DeepReadonly<Pick<FolderType, 'id' | 'created_at' | 'title'>>;