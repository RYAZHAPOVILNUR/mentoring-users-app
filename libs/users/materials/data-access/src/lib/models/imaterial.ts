export interface IMaterial extends IMaterialPost {
  id: number;
  created_at: number;
}

export interface IMaterialPost {
  title: string;
  material_link: string;
  folder_id: number;
}
