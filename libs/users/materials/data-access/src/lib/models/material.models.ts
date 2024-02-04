import { DeepReadonly } from '@users/core/utils';

export type Material = DeepReadonly<{
  id: number
  created_at: number,
  title: string,
  material_link: string,
  folder_id: number
}>

export type CreateMaterial = DeepReadonly<{
  title: string,
  material_link: string,
  // folder_id?: number
}>
