import { DeepReadonly } from '../../../../../../core/utils/src';
import { LoadingStatus } from '../../../../../../core/data-access/src';
import { MaterialsDTO } from '@users/core/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsDTO[];
  status: LoadingStatus;
  errors: string | null;
  lang: string | null;
}>;
