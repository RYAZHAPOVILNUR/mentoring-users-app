import { FoldersDTO } from "./folders-dto.model";


export type FoldersEntity = Omit<FoldersDTO, 'created_at'> & {
    createdAt: string;    // created_at переименовано в createdAt
};