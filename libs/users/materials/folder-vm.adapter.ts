import { FolderEntity } from "../../core/data-access/src"
import { FoldersVM } from "./folder-vm"

type FoldersVMAdapter = {
  entityToVM(entity: FolderEntity): FoldersVM;
}

export const foldersVMAdapter: FoldersVMAdapter = {
  entityToVM({id, name, createAt, typeFolder, isOwn}) {
    return {id, name, createAt, typeFolder ,isOwn};
  }
}