import { DeepReadonly } from '@users/core/utils';
import { FileFormat } from '../fileFormat.type';

export type MaterialsDTO = DeepReadonly<{
  material_link: string;
  folder_id: number;
  id: number;
  created_at: string;
  title: string;
  material_format: FileFormat;
}>;

export type CreateMaterialDTO = DeepReadonly<{
  material_link: string;
  folder_id: number;
  id: number;
  created_at: string;
  title: string;
  material_format?: FileFormat;
}>;

export type MaterialsPhoto = {
  path: string;
  name: string;
  type: 'image';
  size: number;
  mime: 'image/jpeg';
  meta: {
    width: number;
    height: number;
  };
  url: string;
};
