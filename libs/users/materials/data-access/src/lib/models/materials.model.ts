export interface Folder {
    id: number;
    created_at: number;
    title: string;
    material_id: number;
  }
  
  export interface Material {
    id: number;
    created_at: number;
    title: string;
    material_link: string;
  }
  
  export interface IMaterials {
    folders: Folder[];
    materials: Material[]
  }

  export interface CreateFolder {

    "title": string,
    "material_id": number
  }