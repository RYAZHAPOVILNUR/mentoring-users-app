import { LoadingStatus } from "@users/core/data-access";
import { TFolderDTO, foldersReducer } from "@users/materials/data-access";

export type TFolderListVM = {
  folders: TFolderDTO[],
  status: LoadingStatus,
  error: foldersReducer.TFoldersError | null,
}
