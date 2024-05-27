import { DeepReadonly } from "@users/core/utils";

export type CreateMaterial = DeepReadonly<{
    title: string;
    material_link: string;
    folder_id: number;
}>