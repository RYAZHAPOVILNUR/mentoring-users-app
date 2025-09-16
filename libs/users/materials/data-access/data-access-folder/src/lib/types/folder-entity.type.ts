import { FolderDTO } from './folder-dto.type';

export type FolderEntity = Omit<FolderDTO, 'material_link' | 'folder_id'> & {
  materialLink: string;
  folderId: number;
};
