export type MaterialsType = {
    id: number;
    created_at: number;
    title: string;
    material_link: string;
    folder_id: number;
  };
  
  export type AddMaterialsType = {
    title: string;
    material_link: string;
    folder_id?: number;
  };
  