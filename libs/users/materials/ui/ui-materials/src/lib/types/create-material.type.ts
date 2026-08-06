import { Material } from '../interfaces/material.interface';

export type CreateMaterial = Pick<Material, 'material_link' | 'title'>;
