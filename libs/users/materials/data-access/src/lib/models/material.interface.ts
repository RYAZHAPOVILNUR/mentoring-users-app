import { Folder } from './folder.interface';

export interface Material extends Folder {
  material_link: string;
  folder_id: number;
}
