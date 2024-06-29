import { DeepReadonly } from "@users/core/utils";
import { MaterialsDTO } from "./materials-dto.model";

export type CreateMaterialsDTO = DeepReadonly<Omit<MaterialsDTO, "id" | "created_at">>;