import { DeepReadonly } from "@users/core/utils";

export type FoldersDTO = DeepReadonly<{
  id: number;
  created_at: string;
  title: string;
}>;

export type CreateFoldersDTO = DeepReadonly<{
  title: string;
}>;
  