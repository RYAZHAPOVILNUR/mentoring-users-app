import { Folder, Material } from "@users/materials/data-access"

export type MaterialsVM = {
    openedFolder: Folder | null,
    allMaterials: Material[] | null,
}