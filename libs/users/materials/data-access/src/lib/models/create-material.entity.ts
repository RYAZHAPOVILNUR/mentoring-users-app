import { DeepReadonly } from "@users/core/utils";
import { MaterialsEntity } from "./materials.entity";

export type CreateMaterialsEntity = DeepReadonly<Omit<MaterialsEntity, "id" | "createdAt">>;
