import { IFolder, MaterialsErrors } from "@users/materials/data-access";
import { DeepReadonly } from "@users/core/utils";
import { MaterialVM } from "@users/materials/data-access";
import { LoadingStatus } from "@users/core/data-access";

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialVM[];
  folder: IFolder | null;
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;
