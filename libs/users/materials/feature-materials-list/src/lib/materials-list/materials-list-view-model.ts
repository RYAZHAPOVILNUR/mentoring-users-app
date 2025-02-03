import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors } from '@users/materials/data-access';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folder.model';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/materials.model';

export type MaterialsListVM = DeepReadonly<{
  openedFolder: IFolder | null;
  materials: IMaterial[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
