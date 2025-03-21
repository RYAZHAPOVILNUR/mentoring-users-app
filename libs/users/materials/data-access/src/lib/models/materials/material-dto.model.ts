import { DeepReadonly } from '@users/core/utils';

export type TMaterialDTO = DeepReadonly<{
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}>;

export type TCreateMaterialDTO = DeepReadonly<{
  id?: number;
  created_at?: string;
  title: string;
  material_link: string;
  folder_id: number;
}>;
