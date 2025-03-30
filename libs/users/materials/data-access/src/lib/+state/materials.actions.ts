import { createAction,  emptyProps, props } from '@ngrx/store';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/material-add.model';
import { FoldersEntity } from '../models/folders.entity';
import { CreateFoldersDTO } from '../models/folders-dto.model';

// folders
export const initFolders = createAction('[Materials Page]  Init');
export const loadFoldersSuccess = createAction('[Materials /API] Load Folders Success', props<{ folders: FoldersEntity[] }>());
export const loadFoldersFailure = createAction('[Materials /API] Load Folders Failure', props<{ error: any }>());

export const deleteFolder = createAction('[Materials Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Materials /API] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailure = createAction('[Materials /API] Delete Folder Failure', props<{ error: any }>());

export const addFolder = createAction('[Materials Page] Add Folder', props<{ folderData: CreateFoldersDTO }>());
export const addFolderSuccess = createAction('[Materials /API] Add Folder Success', props<{ folderData: FoldersEntity }>());
export const addFolderFailure = createAction('[Materials /API] Add Folder Failure', props<{ error: any }>());

export const openFolder = createAction('[Materials Page] Open Folder', emptyProps);
export const openFolderSuccess = createAction('[Materials /API] Open Folder Success', props<{ folder: FoldersEntity }>());
export const openFolderFailure = createAction('[Materials /API] Open Folder Failure', props<{ error: any }>());

// materials
export const loadMaterials = createAction('[Materials Page] Load Materials');
export const loadMaterialsSuccess = createAction('[Materials Page] Load Materials Success', props<{materials: IMaterial[] }>()); 
export const loadMaterialsFailure = createAction('[Materials Page] Load Materials Failure', props<{ error: any }>()); 

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials Page] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction('[Materials Page] Delete Material Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials Page] Add Material', props<{ material: IAddMaterial }>());
export const addMaterialSuccess = createAction('[Materials Page] Add Material Success', props<{ material: IMaterial }>());
export const addMaterialFailure = createAction('[Materials Page] Add Material Failure', props<{ error: any }>());
