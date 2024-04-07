import { LoadingStatus } from "@users/core/data-access"
import { DeepReadonly } from "@users/core/utils"
import { Folder, MaterialsError } from "@users/materials/data-access"

export type FolderListVM = {
    folders: Folder[],
    status: LoadingStatus,
    error: MaterialsError | null,
}