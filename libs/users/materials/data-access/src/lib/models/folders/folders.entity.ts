import { TFoldersDTO } from './folder-dto.model';

export type TFoldersEntity = Omit<TFoldersDTO, 'created_at'> & {
  createdAt: number;
};
