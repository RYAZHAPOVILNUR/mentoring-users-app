import { DeepReadonly } from '@users/core/utils';
import { FoldersVM } from '../../../../folders-vm';
import { FoldersErrors } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.models';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
