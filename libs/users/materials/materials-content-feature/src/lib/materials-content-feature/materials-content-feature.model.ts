import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { Folder, Material } from "@users/materials/data-access";

export type MaterialsVM = DeepReadonly<{

  openedFolder: Folder | null,
  status: LoadingStatus,
  materials: Material[]
}>