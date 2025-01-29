import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors } from '@users/materials/data-access';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folder.model';

export type FoldersListVM = DeepReadonly<{
  folders: IFolder[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
