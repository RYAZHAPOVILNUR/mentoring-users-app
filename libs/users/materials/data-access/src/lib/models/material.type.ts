export type TMaterial = {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}

export type TAddMaterial = {
  title: string;
  material_link: string;
  folder_id?: number;
}
