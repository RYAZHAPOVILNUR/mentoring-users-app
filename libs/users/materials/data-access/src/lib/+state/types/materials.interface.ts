export interface Folder {
  id: number,
  created_at: string,
  title: string,
}

export interface Material {
  id?: number,
  created_at: string,
  title: string,
  material_link: string,
  folder_id: number,
}

export interface IAddFolder {
  title: string,
  material_id?: number
}