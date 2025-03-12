import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus, MaterialsDTO } from '@users/core/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsDTO[];
  status: LoadingStatus;
  errors: string | null;
  lang: string | null;
}>;
