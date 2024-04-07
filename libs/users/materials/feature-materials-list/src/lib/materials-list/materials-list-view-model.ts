import { LoadingStatus } from "@users/core/data-access"
import { Material, MaterialsError } from "@users/materials/data-access"

export type  MaterialsListVM = {
    materials: Material[],
    status: LoadingStatus,
    error: MaterialsError | null,
}