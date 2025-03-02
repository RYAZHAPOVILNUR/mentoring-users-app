import { DeepReadonly } from '@users/core/utils';


export type MaterialsDTO = DeepReadonly<{
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}>;

export type CreateFolderDTO = DeepReadonly<{
  id?: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}>;
