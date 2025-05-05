import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors} from 'libs/users/materials/data-access/src/lib/+state/folders/folders.reducer';
import {IFolder } from 'libs/users/materials/data-access/src/lib/models/folders/folders.models'

export type FoldersListVM = DeepReadonly<{
  folders: IFolder[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
