import { DeepReadonly } from "@users/core/utils"

// export type Material = DeepReadonly<{
//     id_material: number,
//     name: string,
//     material_link: string,
//     id_folder: number,
// }>

export type Material = {
    id: number,
    title: string,
    material_link: string,
    folder_id: number,
    created_at: number,
}