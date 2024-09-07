import { Material } from '../models/material.interface';

export function getMaterialsByFolderId(
  allMaterials: Material[],
  folderId: number
) {
  return allMaterials.filter((material) => material.folder_id === folderId);
}
