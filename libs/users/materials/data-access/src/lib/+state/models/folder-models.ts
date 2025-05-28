export interface FolderDTO {
  id: number; 
  created_at: number,
  title: string;
  material_id: number;
}

export interface CreateFolderDTO {
  id: number; 
  created_at?: number,
  title?: string;
}




