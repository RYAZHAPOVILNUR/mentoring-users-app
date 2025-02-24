import { FoldersDTO } from './folders-dto.model';

export type FoldersEntity = Omit<FoldersDTO, "id">;
