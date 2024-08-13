import { LoadingStatus } from "@users/core/data-access"
import { Folder, Material } from "@users/materials/data-access"

export type MaterialsListVM = {
  openedFolder: Folder | null,
  materials: Material[],
  loadingStatus: LoadingStatus,
}
