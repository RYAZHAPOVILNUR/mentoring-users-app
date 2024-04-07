import { DeepReadonly } from "@users/core/utils"

export type MaterialAdd = DeepReadonly<{
    title: string,
    date_create?: string,
    material_link: string,
    folder_id: number,
}>
