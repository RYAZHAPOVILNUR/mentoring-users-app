export interface IMaterial {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}

export interface IMaterialCreate {
  title: string;
  material_link: string;
  folder_id: number;
}

export enum MaterialType {
  Video = 'ВИДЕО',
  Audio = 'ПОДКАСТ',
  Pdf = 'PDF',
}
