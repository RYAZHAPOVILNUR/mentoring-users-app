import { DeepReadonly } from '@users/core/utils';

export type TFolderDTO = DeepReadonly<{
  id: number,
  title: string,
  created_at: string,
}>

export type TFolderVM = DeepReadonly< Omit<TFolderDTO, 'id'> >

export type TFolderCreate = DeepReadonly< Pick<TFolderDTO, 'title'> >
