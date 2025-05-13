import { LoadingStatus } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors } from 'libs/users/materials/data-access/src';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
