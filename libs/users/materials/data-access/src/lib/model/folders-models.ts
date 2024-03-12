export interface IFolder {
  id: number;
  created_at: number;
  title: string;
  material_link?: string;
}

export interface IAddFolder {
  title: string;
}


export interface IMaterial {
    id: number,
    created_at: number,
    title: string,
    material_link: string,
    folder_id: number
}

export interface IAddMaterial{
  title: string,
  material_link: string,
  folder_id: number
}