/**
 * Interface for the 'Materials' data
 */

export type MaterialsStatus = 'init' | 'loaded' | 'loading' | 'failed';

export type FolderDTO = {
  id: number | string;
  created_at: string;
  title: string;
};

export type MaterialSchema = {
  folders: FolderDTO[];
  materials: MaterialDTO[];
  status: MaterialsStatus;
  error: string | null;
};

export interface MaterialsEntity {
  id: string | number; // Primary ID
  name: string;
}

export type MaterialDTO = {
  id: number;
  created_at: string;
  folder_id: number;
  material_link: string;
  title: string;
};
