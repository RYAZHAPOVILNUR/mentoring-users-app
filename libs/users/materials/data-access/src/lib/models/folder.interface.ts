import { DeepReadonly } from '@users/core/utils';

export type IFolder = DeepReadonly<{
  id: number,
  created_at: string,
  title: string
}>

export type CreateIFolder = DeepReadonly<{
  title: string
}>


