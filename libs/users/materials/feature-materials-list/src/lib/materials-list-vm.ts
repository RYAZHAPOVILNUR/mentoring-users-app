import { LoadingStatus } from "@users/core/data-access"
import { Folder, MaterialVM } from "@users/materials/data-access"

export type MaterialsListVM = {
  openedFolder: Folder | null,
  materials: MaterialVM[],
  loadingStatus: LoadingStatus,
}
