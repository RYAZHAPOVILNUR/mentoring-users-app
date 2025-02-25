import { FolderEntity, LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils"
import { FoldersError } from "@users/materials/data-access";
import { FoldersVM } from "libs/users/materials/folder-vm"

export type FolderListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersError | null;
  openedFolder: FolderEntity;
}>