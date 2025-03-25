import { FolderEntity } from "../../core/data-access/src"
import { FoldersVM } from "./folder-vm"

type FoldersVMAdapter = {
  entityToVM(entity: FolderEntity): FoldersVM;
}

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({id, title, created_at, typeFolder, isOwn}) {
    return {id, title, created_at, typeFolder ,isOwn};
  }
}