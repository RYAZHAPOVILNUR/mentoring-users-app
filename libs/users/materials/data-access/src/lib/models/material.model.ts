export interface IMaterial {
  id: number;
  folder_id: number;
  created_at: number;
  title: string;
  material_link: string;
}

export interface IAddMaterial {
  folder_id?: number;
  title: string;
  material_link: string;
}
