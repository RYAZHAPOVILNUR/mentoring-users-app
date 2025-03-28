import { DeepReadonly } from '@users/core/utils';
import { TMaterial } from '../models/material.type';

export type MaterialVM = DeepReadonly<Pick<TMaterial, 'id' | 'created_at' | 'title' | 'material_link' | 'folder_id'>>;
