import { FoldersDTO } from './folders-dto.model';

export type MaterialsDTO = FoldersDTO & {
  material_link: string;
  folder_id: number
}
export type CreateMaterialDTO = {
  title: string;
  material_link: string;
  folder_id?: number;
  type?: 'video' | 'pdf' | 'podcast'
}
export enum MaterialFileType {
  video = 'видео',
  pdf = 'PDF файл',
  podcast = 'подкаст'
}
