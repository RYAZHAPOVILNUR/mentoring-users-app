export interface Material {
  id: number;
  title: string;
  created_at: string;
  material_link: string;
  folder_id: number;
}

export interface CreateMaterial {
  title: string;
  material_link: string;
  folder_id: number;
}
