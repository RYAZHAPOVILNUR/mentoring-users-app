import { LoadingStatus } from "@users/core/data-access"
import { Folder } from "libs/users/materials/data-access/src/lib/models/folder.model"

export type FoldersListVM = {
  folders: Folder[],
  loadingStatus: LoadingStatus
}
