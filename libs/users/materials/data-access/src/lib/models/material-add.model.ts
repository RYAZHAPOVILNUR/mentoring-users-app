import { DeepReadonly } from "@users/core/utils"

// export type MaterialAdd = DeepReadonly<{
//     name: string,
//     date_create: string,
//     material_link: string,
//     id_folder: number,
// }>

export type MaterialAdd = {
    title: string,
    date_create?: string,
    material_link: string,
    folder_id: number,
}