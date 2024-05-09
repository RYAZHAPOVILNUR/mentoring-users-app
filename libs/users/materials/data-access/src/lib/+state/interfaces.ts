export interface Folder {
    id: number;
    created_at: number;
    title: string
  }

export interface Mat {
  id: number,
  created_at: number,
  title: string,
  material_link: string,
  folder_id: number
}

export interface MatRes {
  title: string | null;
  material_link: string | null;
  folder_id: number
}