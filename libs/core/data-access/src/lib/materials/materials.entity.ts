import { FileFormat } from '../fileFormat.type';
import { MaterialsDTO } from './materials-dto.model';

export type MaterialsEntity = Omit<MaterialsDTO, 'created_at' | 'material_link' | 'folder_id' | 'material_format'> & {
  createdAt: string;
  materialLink: string;
  folderId: number;
  materialFormat: FileFormat;
};
