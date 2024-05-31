import { Folder, Material } from "./materials.model";

type TLoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface FolderStateInterface {
  status: TLoadingStatus;
  folder: Folder[];
  error: string | null;
}
export interface MaterialStateInterface {
  status: TLoadingStatus;
  folder: Material[];
  error: string | null;
}