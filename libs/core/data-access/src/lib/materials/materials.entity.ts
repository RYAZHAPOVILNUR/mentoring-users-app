import { MaterialsDTO } from './materials-dto.model';

export type MaterialsEntity = Omit<MaterialsDTO, 'created_at' | 'title' | 'material_link' | 'folder_id'> & {
  createdAt: string,
  title: string,
  materialLink: string,
  folderId: number
}

export type AddMaterialsEntity = {
  title: string,
  materialLink: string,
  folderId: number,
}
