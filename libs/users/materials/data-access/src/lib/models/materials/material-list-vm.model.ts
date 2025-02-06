import { DeepReadonly } from '@users/core/utils';
import { TMaterialDTO } from './material-dto.model';
import { LoadingStatus } from '@users/core/data-access';
import { TMaterialError } from './material-error.model';

export type TMaterialListVM = DeepReadonly<{
  materials: TMaterialDTO[];
  status: LoadingStatus;
  errors: TMaterialError | null;
  folder: { folderTitle: string; folderId: number };
}>;
