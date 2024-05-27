import { DeepReadonly } from "@users/core/utils";

export type AddMaterial = DeepReadonly<{
    title: string;
    material_link: string;
    type: string
}>