import { Folder, Material } from "./materials.interface";

type TLoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface MaterialsStateInterface {
  status: TLoadingStatus;
  folders: Folder[];
  materials: Material[];
  error: string | null;
}
