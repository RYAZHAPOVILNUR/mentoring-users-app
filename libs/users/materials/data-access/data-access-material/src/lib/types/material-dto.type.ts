import { DeepReadonly } from '@shared/util-typescript';

export type MaterialDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
}>;
