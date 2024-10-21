import { FoldersDTO } from './folders-dto.model';

export type MaterialsDTO = FoldersDTO & {
  material_link: string;
  folder_id: number
}
