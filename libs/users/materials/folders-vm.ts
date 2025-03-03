import { DeepReadonly } from '../../core/utils/src';
import { FoldersEntity } from '../../core/data-access/src';


export type FoldersVm = DeepReadonly<
  Pick<FoldersEntity, 'id' | 'title' | 'createdAt'>
>
