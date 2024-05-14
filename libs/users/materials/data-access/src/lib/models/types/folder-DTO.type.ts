import { DeepReadonly } from "@users/core/utils";

export type FolderDTO = DeepReadonly<{
    id: number;
    title: string;
    created_at: string;
}>

export type CreateFolder = DeepReadonly<{
    id?: number;
    title: string;
    created_at?: string;
}>