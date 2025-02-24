import { DeepReadonly } from '../../../../../../core/utils/src';
import { FoldersDTO, LoadingStatus } from '../../../../../../core/data-access/src';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersDTO[];
  status: LoadingStatus;
  errors: string | null;
}>;
