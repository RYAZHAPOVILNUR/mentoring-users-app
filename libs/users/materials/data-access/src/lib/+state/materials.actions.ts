import { createAction, props } from '@ngrx/store';
import { Folder, IAddFolder, Material } from '../materials.interface';

export const getFolders = createAction(
  '[Folders] Get Folders'
);
export const getFoldersSuccess = createAction(
  '[Folders] Get Folders Success', 
  props<{ folders: Folder[] }>()
);
export const getFoldersFailure = createAction(
  '[Folders] Get Folders Failure',
  props<{ error: string }>()
);

export const addFolder = createAction('[Folders Page] Add Folder', props<{ folderData: IAddFolder }>());
export const addFolderSuccess = createAction('[Folders Page] Add Folder Success', props<{ folderData: Folder }>());
export const addFolderFailure = createAction('[Folders Page] Add Folder Failure', props<{ error: string }>());

export const getMaterials = createAction(
  '[Materials] Get Materials'
);
export const getMaterialsSuccess = createAction(
  '[Materials] Get Materials Success', 
  props<{ materials: Material[] }>()
);
export const getMaterialsFailure = createAction(
  '[Materials] Get Materials Failure',
  props<{ error: string }>()
);