import { LoadingStatus } from "@users/core/data-access"
import { DeepReadonly } from "@users/core/utils"
import { FolderEntity, MaterialEntity } from "libs/users/materials/data-access/src/lib/model/material.entity"

export type MaterialsVM = DeepReadonly<{
  openedFolder: FolderEntity | null,
  filteredMaterials: MaterialEntity[]
  materialsStatus: LoadingStatus,
}>