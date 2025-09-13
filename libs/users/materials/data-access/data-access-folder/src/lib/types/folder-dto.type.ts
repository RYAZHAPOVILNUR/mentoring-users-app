import { DeepReadonly } from '@shared/util-typescript';

export type FolderDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
}>;
