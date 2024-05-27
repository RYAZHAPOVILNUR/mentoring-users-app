import { DeepReadonly } from "@users/core/utils";
import { FolderDTO, MaterialDTO, MaterialsStatus } from "@users/materials/data-access";

export type MaterialsVM = DeepReadonly<{
    materials: MaterialDTO[],
    status: MaterialsStatus,
    openedFolder?: FolderDTO | null,
}>