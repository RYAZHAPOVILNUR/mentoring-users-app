export interface FolderDTO {
  id: number,
  created_at: string,
  title: string
}

export interface AddFolderDTO {
  title: string
}

export interface MaterialDTO {
  id: number,
  title: string,
  material_link: string,
  folder_id: number,
  created_at: number
}

export interface AddMaterialDTO {
  title: string,
  material_link: string,
  folder_id: number
}