import { LoadingStatus } from "@users/core/data-access"
import { FolderEntity } from "./folders.entity"
import { MaterialsEntity } from "./materials.entity"

export type vmFolders = {
    folders: FolderEntity[],
    status: LoadingStatus,
    error: any
}

export type vmMaterials = {
    materials: MaterialsEntity[],
    status: LoadingStatus
} 