import { Material } from './material.interface';

export type CreateMaterial = Partial<Pick<Material, 'title' | 'material_link' | 'folder_id'>>;
