export interface IFolder {
  id: number;
  created_at: number;
  title: string;
  material_link: string;
}

export interface IAddFolder{
  title: string,
  material_link?: string,
}