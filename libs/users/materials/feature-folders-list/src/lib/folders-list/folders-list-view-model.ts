import { DeepReadonly } from '@users/core/utils';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folder.model';

export type FoldersListVM = DeepReadonly<{
  folders: IFolder[];
}>;
