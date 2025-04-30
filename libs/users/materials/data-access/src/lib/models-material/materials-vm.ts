import { DeepReadonly } from "@users/core/utils";
import { MaterialsEntity } from "./materials.entity";

export type MaterialsVM = DeepReadonly<
    Pick<MaterialsEntity, 'id'| 'created_at' | 'title' | 'material_link' | 'folder_id' | 'material_format' >
>