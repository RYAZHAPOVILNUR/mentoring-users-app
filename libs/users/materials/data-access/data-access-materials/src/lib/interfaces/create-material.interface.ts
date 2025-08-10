export interface CreateMaterial {
  title: string;
  material_link: string;
  folder_id: number;
}

export interface Material extends CreateMaterial {
  id: number;
  created_at: Date;
}
