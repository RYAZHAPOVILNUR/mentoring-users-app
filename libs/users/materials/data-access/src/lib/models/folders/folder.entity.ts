import { TFolderDTO } from './folder-dto.model';

export type TFolderEntity = Omit<TFolderDTO, 'created_at'> & {
  createdAt: number;
};
