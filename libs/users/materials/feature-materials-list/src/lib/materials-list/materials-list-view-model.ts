import { LoadingStatus } from "@users/core/data-access"
import { DeepReadonly } from "@users/core/utils"
import { Material, MaterialsError } from "@users/materials/data-access"

export type  MaterialsListVM = DeepReadonly<{
    materials: Material[],
    status: LoadingStatus,
    error: MaterialsError | null,
}>