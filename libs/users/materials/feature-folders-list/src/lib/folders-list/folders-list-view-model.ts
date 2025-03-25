import { DeepReadonly } from '@users/core/utils';
import { FoldersDTO, LoadingStatus } from '@users/core/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersDTO[];
  status: LoadingStatus;
  errors: string | null;
  lang: string | null;
}>;
