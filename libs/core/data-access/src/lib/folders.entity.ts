import { FolderDTO } from "./folder-dto.model";

export type FolderEntity= Omit<FolderDTO, 'type'> & {
  isOwn: boolean | null;
}