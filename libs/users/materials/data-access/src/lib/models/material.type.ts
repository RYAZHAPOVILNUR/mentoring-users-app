import { Material } from '@users/materials/data-access';

export type CreateMaterial = Pick<Material, 'title' | 'material_link'>;

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};
