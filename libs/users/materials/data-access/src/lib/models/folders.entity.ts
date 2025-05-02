import { FoldersDTO } from "./folders-dto.model";

export type FoldersEntity = Omit<FoldersDTO, 'created_at'> & {
  createdAt: string;
};