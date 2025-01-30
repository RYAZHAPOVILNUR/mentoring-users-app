import { DeepReadonly } from '@users/core/utils';

export type TFoldersDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
}>;

// material_id: number;

export type TCreateFoldersDTO = DeepReadonly<{
  id?: number;
  created_at?: number;
  title: string;
}>;
