//folders models
export interface Folder {
  id: number;
  created_at: number;
  title: string;
  material_id: number;
}

export interface CreateFolder {
  title: string;
  material_id: number;
}

// materials models

export interface Material {
  id: number;
  created_at: number;
  title: string;
  folder_id: number
  material_link: string;
}

export interface IMaterials {
  folders: Folder[];
  materials: Material[];
}

export interface CreateMaterial {
  title: string;
  material_link: string;
}
