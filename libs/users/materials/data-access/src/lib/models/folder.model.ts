import { Material } from "./material.model";

export interface Folder {
  id: string | number,
  title: string,
  createdAt: string;
  materials: Material[],
}