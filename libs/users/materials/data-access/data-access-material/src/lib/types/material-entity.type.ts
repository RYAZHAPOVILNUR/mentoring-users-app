import { MaterialDTO } from './material-dto.type';

export type MaterialEntity = Omit<MaterialDTO, 'material_link' | 'folder_id'> & {
  materialLink: string;
  folderId: number;
};
