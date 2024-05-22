import { MaterialsErrors } from "@materials/data-access"
import { LoadingStatus, MaterialsDTO } from "@users/core/data-access"
import { DeepReadonly } from "@users/core/utils";

export type MaterialsVM = DeepReadonly<{
    materials: MaterialsDTO[];
    status: LoadingStatus;
    errors: MaterialsErrors | null;
  }>;