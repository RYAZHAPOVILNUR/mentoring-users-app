import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { MaterialsErrors } from "@users/materials/data-access";
import { FoldersVM } from "libs/users/materials/folders-vm";

export type FoldersListVM = DeepReadonly<{
    folders: FoldersVM[],
    status: LoadingStatus,
    errors: MaterialsErrors | null
}>