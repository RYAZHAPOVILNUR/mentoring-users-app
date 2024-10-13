import { IFolder } from './folder.interface';

export interface IMaterial extends IFolder {
  material_link: string;
  folder_id: number
}
