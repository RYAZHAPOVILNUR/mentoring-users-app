import { LoadingStatus } from "@users/core/data-access"
import { DeepReadonly } from "@users/core/utils"
import { IFolder, IMaterial } from "libs/users/materials/data-access/src/lib/model/folders-models"

export type MaterialsVM = DeepReadonly<{
  openedFolder: IFolder | null,
  filteredMaterials: IMaterial[]
  materialsStatus: LoadingStatus,
}>