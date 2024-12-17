import { DeepReadonly } from '@users/core/utils';
import {} from '@users/users/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { IFolder } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: IFolder[];
  status: LoadingStatus;
}>;
