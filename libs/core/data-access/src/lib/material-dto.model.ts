import { DeepReadonly } from "@users/core/utils";
export enum TypeMaterial {
  Video = "video",
  PDF = "pdf",
  Audio = "audio",
}
export type MaterialDTO = DeepReadonly<{
  id: number;
  name: string;
  created_at: string;
  link: string;
  typeMaterial?: TypeMaterial;
}>;

export type CreateMaterialDTO = DeepReadonly<{
  id?: number | null;
  name: string;
  created_at: string;
  link: string;
  typeMaterial?: TypeMaterial;
}>;