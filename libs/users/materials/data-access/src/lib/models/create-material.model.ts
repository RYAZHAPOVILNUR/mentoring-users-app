export interface CreateMaterial {
  title: string;
  material_link: string;
  folder_id: number;
}

export type CreateMaterialWithoutFolderId = Omit<CreateMaterial, 'folder_id'>;
