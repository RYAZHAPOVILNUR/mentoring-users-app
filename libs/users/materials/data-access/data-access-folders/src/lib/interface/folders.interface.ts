export interface Folder {
  id: number;
  title: string;
  created_at: string;
}

export interface AddFolder {
  title: string;
  material_id?: number;
}
