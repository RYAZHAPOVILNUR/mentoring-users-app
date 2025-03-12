import { DeepReadonly } from "@users/core/utils";
export enum TypeMaterial {
  Video = "video",
  PDF = "pdf",
  Audio = "audio",
}
export type MaterialDTO = DeepReadonly<{
  id: number;
  title: string;
  created_at: string;
  material_link: string;
  folder_id?: number;
  typeMaterial?: TypeMaterial;
}>;

export type CreateMaterialDTO = DeepReadonly<{
  id?: number | null;
  title: string;
  created_at: string;
  material_link: string;
  folder_id?: number;
  typeMaterial?: TypeMaterial;
}>;