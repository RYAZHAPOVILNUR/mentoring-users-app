import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { FoldersType, MaterialsErrors, MaterialsType } from "@users/materials/data-access";

export type MaterialsVM = DeepReadonly<{
  materials: MaterialsType[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
  title: FoldersType | null;
}>;