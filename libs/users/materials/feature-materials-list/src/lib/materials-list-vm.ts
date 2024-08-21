import { LoadingStatus } from "@users/core/data-access"
import { Folder, MaterialVM, MaterialsError } from "@users/materials/data-access"

export type MaterialsListVM = {
  openedFolder: Folder | null,
  materials: MaterialVM[],
  loadingStatus: LoadingStatus,
  error: MaterialsError | null,
}
