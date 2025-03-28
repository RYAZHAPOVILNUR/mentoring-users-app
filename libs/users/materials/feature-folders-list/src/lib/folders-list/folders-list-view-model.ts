import { DeepReadonly } from '@users/core/utils';
import { FoldersSecondModel } from '../../../../folders-model';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersErrors } from '@users/materials/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersSecondModel[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>
