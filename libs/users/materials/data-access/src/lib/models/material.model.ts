export interface IMaterial {
  id: number;
  folderId?: number;
  created_at: number;
  title: string;
  material_link: string;
}

export type IAddMaterial = Omit<IMaterial, 'id' | 'created_at'>;
