import { DeepReadonly } from "@users/core/utils";

export type MaterialDTO = DeepReadonly<{
    id: number;
    createt_at: string;
    title: string;
    material_link: string,
    folder_id: number;
    type?: string;
}>