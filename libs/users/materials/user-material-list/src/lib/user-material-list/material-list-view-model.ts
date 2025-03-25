import { MaterialError } from "@users/user-material-data-access";
import { MaterialsVM } from "../user-material-card/materials.vm";
import { DeepReadonly } from "@users/core/utils";
import { LoadingStatus } from "@users/core/data-access";

export type MaterialListVM = DeepReadonly<{
  materials: MaterialsVM[];
  status: LoadingStatus;
  errors: MaterialError | null;
}>