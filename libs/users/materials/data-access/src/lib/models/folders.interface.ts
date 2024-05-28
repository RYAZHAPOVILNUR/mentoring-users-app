export interface Folder {
  id: number;
  created_at: string;
  title: string;
}

export interface FolderErrors {
  status: string;
  [key: string]: unknown;
}

export interface FolderCreate {
  title: string;
}

export interface Material {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}

export interface MaterialCreate {
  title: string;
  material_link: string;
  folder_id: number;
}

export interface MaterialsErrors {
  status: string;
  [key: string]: unknown;
}

export interface ContentData {
  type: string;
  content: string;
  title: string;
}
