import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { Material, MaterialsErrors } from "@users/materials/data-access";

export type MaterialsListVM = DeepReadonly<{
  materials: Material[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;