import { DeepReadonly } from "@users/core/utils"

// export type FolderAdd =  DeepReadonly<{
//     title: string,
//     id_folder?: number,
// }>

export type FolderAdd =  {
    title: string,
    id_folder: number,
}