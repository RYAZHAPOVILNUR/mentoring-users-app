import { DeepReadonly } from "@users/core/utils";

export type Folder = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
}>
