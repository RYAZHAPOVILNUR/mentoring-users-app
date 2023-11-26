import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { IFolder } from "@users/materials/data-access";

export type FoldersListVM = DeepReadonly<{
    folders: IFolder[],
    status: LoadingStatus,
    // materials: IMaterial[]
}>