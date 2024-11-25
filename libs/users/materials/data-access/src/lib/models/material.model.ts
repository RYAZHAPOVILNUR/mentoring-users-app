export type MaterialDTO = {
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
}

export type AddMaterialDTO = {
  title: string;
  material_link: string;
  folder_id?: number;
}
