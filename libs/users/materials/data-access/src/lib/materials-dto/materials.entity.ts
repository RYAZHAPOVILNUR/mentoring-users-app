import { MaterialsDTO } from './materials-dto.models';

export type MaterialsEntity = Omit<MaterialsDTO, 'created_at' | 'material_link' | 'folder_id'> & {
  createdAt: number;
  materialLink: string;
  folderId: number;
};
