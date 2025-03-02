import { MaterialsDTO } from './materials-dto.model';

export type MaterialsEntity = Omit<MaterialsDTO, 'created_at' | 'material_link' | 'folder_id'> & {
  createdAt: string;
  materialLink: string;
  folderId: number;
}
