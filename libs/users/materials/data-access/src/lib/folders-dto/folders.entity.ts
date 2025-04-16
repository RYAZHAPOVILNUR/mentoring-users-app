import { FoldersDTO } from './folders-dto.models';

export type FoldersEntity = Omit<FoldersDTO, 'created_at'> & {
  createdAt: number;
};
