import { DeepReadonly } from "@users/core/utils"

// export type Folder = DeepReadonly<{
//     id: number,
//     created_at: number,
//     title: string,
//     material_id: number
// }>

export type Folder = {
    id: number,
    created_at: number,
    title: string,
    id_material: number
}