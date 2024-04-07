import { DeepReadonly } from "@users/core/utils"

export type Material = DeepReadonly<{
    id: number,
    title: string,
    material_link: string,
    folder_id: number,
    created_at: number,
}>