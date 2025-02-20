import { DeepReadonly } from '@users/core/utils';

export type MaterialsDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
}>;
