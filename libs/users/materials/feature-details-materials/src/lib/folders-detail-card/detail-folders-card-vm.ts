import { LoadingStatus, FolderEntity } from "@users/core/data-access";
import { FoldersError } from "@users/materials/data-access";


export type DetailFoldersCardVm = {
  editMode: boolean;
  status: LoadingStatus;
  folder: FolderEntity | null;
  errors: FoldersError | null;
};
