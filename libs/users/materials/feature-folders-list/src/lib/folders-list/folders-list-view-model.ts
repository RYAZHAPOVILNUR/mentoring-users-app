import { DeepReadonly } from '@users/core/utils';
import { FoldersVM } from '../../../../folders-vm';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];

}>
