import { DeepReadonly } from '@users/core/utils';
import { MaterialsEntity } from './data-access/src';

export type MaterialsVM = DeepReadonly<Pick<MaterialsEntity,
  'id' | 'title' | 'material_link' | 'created_at' | 'folder_id'>> & {
  materialLink: string;
  createdAt: string;
  folderId: number;
  type: 'video' | 'pdf' | 'podcast';
  preview: string
};
