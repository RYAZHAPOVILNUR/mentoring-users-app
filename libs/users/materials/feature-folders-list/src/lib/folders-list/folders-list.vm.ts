import { DeepReadonly } from '@users/core/utils';
import { FoldersVM } from '@users/materials';

export type FoldersListVM = DeepReadonly<{ folders: FoldersVM[] }>;
