import { DeepReadonly } from '@users/core/utils';

export type TMaterialDTO = DeepReadonly<{
  id: number,
  title: string,
  created_at: string,
  material_link: string,
  folder_id: number,
}>

export type TMaterialCreate = DeepReadonly< Pick<TMaterialDTO, 'title' | 'material_link'> >

export type TMaterialEntity = DeepReadonly< Omit<TMaterialDTO, 'id' | 'created_at'> >

export type TMaterialVM = DeepReadonly< Omit<TMaterialDTO, 'id' | 'folder_id'> >
