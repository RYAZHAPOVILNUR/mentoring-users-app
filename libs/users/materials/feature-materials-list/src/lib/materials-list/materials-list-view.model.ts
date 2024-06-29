import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { Folder, MaterialsEntity } from "@users/users/materials/data-access";

export type MaterialsListVM = DeepReadonly<{
  openedFolder: Folder | null;
  materials: MaterialsEntity[];
  status: LoadingStatus;
  error: Error | null;
}>;
