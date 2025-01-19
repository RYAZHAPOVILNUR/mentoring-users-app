import { DeepReadonly } from '@users/core/utils';

export type CreateMaterialDTO = DeepReadonly<{
  title: string;
  material_link: string;
  folder_id: number;
}>;

export type MaterialDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
}>;
