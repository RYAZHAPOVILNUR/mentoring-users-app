export interface Folder {
    id: number;
    created_at: number;
    title: string
  }

export interface Material {
  id: number,
  created_at: Date,
  title: string,
  material_link: string,
  folder_id: number
}

export interface MaterialRes {
  title: string;
  material_link: string;
  folder_id: number
}