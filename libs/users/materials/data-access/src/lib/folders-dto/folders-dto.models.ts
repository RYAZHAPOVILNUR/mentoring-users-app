import { DeepReadonly } from '@users/core/utils';

export type FoldersDTO = DeepReadonly<{
  id: number;
  title: string;
  created_at: number;
}>;

export type CreateFolderDTO = DeepReadonly<{
  id: number;
  title: string;
  createdAt: number;
}>;
