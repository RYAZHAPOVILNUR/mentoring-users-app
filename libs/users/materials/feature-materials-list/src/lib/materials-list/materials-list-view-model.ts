import { LoadingStatus } from "@users/core/data-access";
import { TMaterialDTO, materialsReducer } from "@users/materials/data-access";

export type TMaterialListVM = {
  materials: TMaterialDTO[],
  status: LoadingStatus,
  error: materialsReducer.TMaterialsError | null,
}
