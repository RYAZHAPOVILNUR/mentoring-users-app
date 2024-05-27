import { DeepReadonly } from "@users/core/utils";

export type OpenMaterialData = DeepReadonly<{
    title: string;
    link: string;
    type: string;
}>