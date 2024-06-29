import { DeepReadonly } from "@users/core/utils";

export type MaterialsEntity = DeepReadonly<{
  id: number;
  createdAt: number;
  title: string;
  materialLink: string;
  folderId: number;
}>;
