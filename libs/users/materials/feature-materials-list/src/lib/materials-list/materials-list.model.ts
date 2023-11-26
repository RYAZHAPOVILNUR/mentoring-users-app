import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { IFolder, IMaterial } from "@users/materials/data-access";

export type MaterialsVM = DeepReadonly<{
    openedFolder: IFolder | null,
    materialsStatus: LoadingStatus,
    allMaterials: IMaterial[]
}>