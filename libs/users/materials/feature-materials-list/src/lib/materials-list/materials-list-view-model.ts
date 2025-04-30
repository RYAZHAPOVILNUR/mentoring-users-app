import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { FoldersEntity, MaterialsErrors, MaterialsVM } from "@users/materials/data-access";

export type MaterialsListVM = DeepReadonly<{
  allMaterials: MaterialsVM[];
    folderId: number | undefined;
    status: LoadingStatus;
    errors: MaterialsErrors | null;
    openedFolder?: FoldersEntity | null,
  }>;