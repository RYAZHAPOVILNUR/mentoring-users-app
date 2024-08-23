import { DeepReadonly } from '../../../core/utils/src';
import { MaterialsType } from '../data-access/src/lib/models/material.type';

export type MaterialsVM = DeepReadonly<
  Pick<MaterialsType, 'id' | 'created_at' | 'title' | 'material_link' | 'folder_id'>
>;
