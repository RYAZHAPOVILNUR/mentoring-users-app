import { MaterialEntity } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";


export type MaterialsVM = DeepReadonly<Pick<MaterialEntity, "id" | "created_at" | "title" | "material_link" | "folder_id" | "isAudio" | "isPDF" | "isVideo">>;