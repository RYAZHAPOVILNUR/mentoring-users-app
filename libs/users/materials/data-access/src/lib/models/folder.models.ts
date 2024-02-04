import { DeepReadonly } from '@users/core/utils';

export type Folder = DeepReadonly<{
  id: number,
  created_at: string,
  title: string
}>

export type CreateFolder = DeepReadonly<{
  title: string
}>


