export interface MaterialInterface {
  id: number,
  created_at: string,
  title: string,
  material_link: string,
  folder_id: number
}

export interface AddNewMaterialReq {
  title: string,
  material_link: string,
  folder_id: number
}

