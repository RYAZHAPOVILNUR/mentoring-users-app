import { DeepReadonly } from '../../../../../../core/utils/src';
import { FoldersDTO, LoadingStatus } from '../../../../../../core/data-access/src';
import { MaterialsDTO } from '../../../../../../core/data-access/src/lib/materials-dto.model';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsDTO[];
  status: LoadingStatus;
  errors: string | null;
  lang: string | undefined;
}>;
