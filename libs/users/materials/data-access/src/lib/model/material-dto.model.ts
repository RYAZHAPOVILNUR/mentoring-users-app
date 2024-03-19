import { DeepReadonly } from '@users/core/utils'

export type FolderDTO = DeepReadonly<{
  id: number;
  created_at: number;
  title: string;
}>

export type AddFolderDTO = DeepReadonly<{
  title: string;
}>


export type MaterialDTO = DeepReadonly<{
  id: number,
  created_at: number,
  title: string,
  material_link: string,
  folder_id: number
}>

export type AddMaterialDTO = DeepReadonly<{
  title: string,
  material_link: string,
  folder_id?: number
}>