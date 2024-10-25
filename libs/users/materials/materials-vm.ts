import { DeepReadonly } from '../../core/utils/src';
import { MaterialsEntity } from './data-access/src';

export type MaterialsVM = DeepReadonly<Pick<MaterialsEntity,
  'id' | 'title' | 'material_link' | 'created_at' | 'folder_id'>> & {
  materialLink: string;
  createdAt: string;
  folderId: number;
};
