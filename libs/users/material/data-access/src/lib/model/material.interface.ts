export interface Folder {
  id: number;
  created_at: number;
  title: string;
}

export interface CreateFolder {
  title: string;
}

export interface Material {
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
}

export interface CreateMaterial {
  title: string;
  material_link: string;
  folder_id?: number;
}
