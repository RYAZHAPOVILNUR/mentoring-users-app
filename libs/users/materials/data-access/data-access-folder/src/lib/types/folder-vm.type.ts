import { DeepReadonly } from '@shared/util-typescript';

import { FolderDTO } from './folder-dto.type';

export type FolderVM = DeepReadonly<Pick<FolderDTO, 'id' | 'title' | 'created_at'>>;
