import { DeepReadonly } from '@users/core/utils';

export type TFolderDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
}>;

export type TCreateFolderDTO = DeepReadonly<{
  id?: number;
  created_at?: number;
  title: string;
}>;
