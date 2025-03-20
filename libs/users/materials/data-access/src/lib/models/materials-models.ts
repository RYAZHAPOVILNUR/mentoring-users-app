export interface IMaterial {
  id: number;
  title: string;
  created_at: number;
  material_link: string;
  folder_id: number;
}

export interface ICreateMaterial {
  title: string;
  material_link: string;
  folder_id: number;
}