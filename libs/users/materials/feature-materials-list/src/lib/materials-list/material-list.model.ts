import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { FolderDTO, MaterialDTO, MaterialsErrors } from "@users/materials/data-access";

export type MaterialsList = DeepReadonly<{
  openedFolder: FolderDTO | null | undefined;
  materials: MaterialDTO[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
