import { createAction, props } from '@ngrx/store';
import { CreateFolder, CreateMaterial, Folder, Material } from '../model/material.interface';

export const initFolders = createAction('[Folder List Page] Init');

export const loadFoldersSuccess = createAction('[Folder/API] Init Folders Success', props<{ folders: Folder[] }>());

export const loadFolderFailure = createAction('[Folder/API] Init Folders Failure', props<{ error: any }>());

export const createFolder = createAction('[Folder List Page] Create Folder', props<{ folder: CreateFolder }>());

export const createFolderSuccess = createAction('[Folder/API] Create Folder Success', props<{ newFolder: Folder }>());

export const createFolderFailure = createAction('[Folder/API] Create Folder Failure', props<{ error: any }>());

export const deleteFolder = createAction('[Folder List Page] Delete Folder', props<{ id: number }>());

export const deleteFolderSuccess = createAction('[Folder/API] Delete Folder Success', props<{ id: number }>());

export const deleteFolderFailure = createAction('[Folder/API] Delete Folder Failure', props<{ error: any }>());

export const loadMaterial = createAction('[Material Page] Init');

export const loadMaterialSuccess = createAction(
  '[Material/API] Init Material Success',
  props<{ materials: Material[] }>()
);

export const loadMaterialFailure = createAction('[Material/API] Init Material Failure', props<{ error: any }>());

export const loadSelectMaterial = createAction('[Material List Page] Load Select Material', props<{ id: number }>());

export const createMaterial = createAction('[Folder List Page] Create Folder', props<{ material: CreateMaterial }>());

export const createMaterialSuccess = createAction(
  '[Folder/API] Create Folder Success',
  props<{ newMaterial: Material }>()
);

export const createMaterialFailure = createAction('[Folder/API] Create Folder Failure', props<{ error: any }>());

export const deleteMaterial = createAction('[Folder List Page] Delete Folder', props<{ id: number }>());

export const deleteMaterialSuccess = createAction('[Folder/API] Delete Folder Success', props<{ id: number }>());

export const deleteMaterialFailure = createAction('[Folder/API] Delete Folder Failure', props<{ error: any }>());
