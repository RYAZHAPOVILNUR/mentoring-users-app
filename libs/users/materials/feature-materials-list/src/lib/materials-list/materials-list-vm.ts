import { DeepReadonly } from '@users/core/utils';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';

export type MaterialsListVm = DeepReadonly<{
  openedFolder: IFolder | null
}>
