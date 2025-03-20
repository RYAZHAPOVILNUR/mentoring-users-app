export interface IFolder {
  title: string;
  id: number;
  created_at: number;
  material_id: number;
};

export interface ICreateFolder {
  id: number;
  title: string;
  created_at: number;
};

export type FoldersEntity = {
  id: number;
  created_at: number;
  title: string;
};

