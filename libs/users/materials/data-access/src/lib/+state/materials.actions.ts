import { createAction, emptyProps, props } from '@ngrx/store';
import { IFolder } from '../models/folder.model';
import { IAddFolder } from '../models/folder-add.model';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/material-add.model';

// folders
export const loadFolders = createAction('[Materials Page] Load Folders');
export const loadFoldersSuccess = createAction('[Materials Page] Load Folders Success', props<{ folders: IFolder[] }>());
export const loadFoldersFailure = createAction('[Materials Page] Load Folders Failure', props<{ error: any }>());

export const deleteFolder = createAction('[Materials Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Materials Page] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailure = createAction('[Materials Page] Delete Folder Failure', props<{ error: any }>());

export const addFolder = createAction('[Materials Page] Add Folder', props<{ folder: IAddFolder }>());
export const addFolderSuccess = createAction('[Materials Page] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailure = createAction('[Materials Page] Add Folder Failure', props<{ error: any }>());

export const openFolder = createAction('[Materials Page] Open Folder', emptyProps);
export const openFolderSuccess = createAction('[Materials Page] Open Folder Success', props<{ folder: IFolder }>());
export const openFolderFailure = createAction('[Materials Page] Open Folder Failure', props<{ error: any }>());

// materials
export const loadMaterials = createAction('[Materials Page] Load Materials');
export const loadMaterialsSuccess = createAction('[Materials Page] Load Materials Success', props<{ materials: IMaterial[] }>());
export const loadMaterialsFailure = createAction('[Materials Page] Load Materials Failure', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials Page] Delete Folder Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction('[Materials Page] Delete Folder Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials Page] Add Material', props<{ material: IAddMaterial }>());
export const addMaterialSuccess = createAction('[Materials Page] Add Material Success', props<{ material: IMaterial }>());
export const addMaterialFailure = createAction('[Materials Page] Add Material Failure', props<{ error: any }>());