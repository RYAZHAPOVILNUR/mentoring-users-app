import { DeepReadonly } from '@users/core/utils';
import { IMaterial } from '../models/material.model';

export type MaterialVM = DeepReadonly<Pick<IMaterial, 'id' | 'created_at' | 'title' | 'material_link' | 'folder_id'>>;
