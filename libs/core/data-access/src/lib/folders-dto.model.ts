import { DeepReadonly } from '@users/core/utils';

export type FoldersDTO = DeepReadonly<{
  id: string;
  created_at: string;
  title: string;
}>;

export type CreateFolderDTO = DeepReadonly<{
  id?: string | null;
  created_at: string;
  title: string;
}>;
