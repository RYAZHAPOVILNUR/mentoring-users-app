import { createAction, props } from "@ngrx/store";
import { AddNewFolder, Folder } from "../interfaces/folder.interface";
import { AddNewMaterial, Material } from "../interfaces/material.interface";

export const loadFolders = createAction('[Folders] Load Folders');
export const loadFoldersSuccess = createAction('[Folders] Load Folders Success', props<{ folders: Folder[] }>());
export const loadFoldersFailure = createAction('[Folders] Load Folders Failure', props<{ error: any }>());

export const addFolder = createAction('[Folders] Add Folder', props<{ NewFolderData: AddNewFolder }>());
export const addFolderSuccess = createAction('[Folders] Add Folder Success', props<{ NewFolderData: Folder }>());
export const addFolderFailure = createAction('[Folders] Add Folder Failure', props<{ error: any }>());

export const deleteFolder = createAction('[Folders] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailure = createAction('[Folders] Delete Folder Failure', props<{ error: any }>());

export const loadMaterials = createAction('[Materials] Load Materials');
export const loadMaterialsSuccess = createAction('[Materials] Load Materials Success', props<{ materials: Material[] }>());
export const loadMaterialsFailure = createAction('[Materials] Load Materials Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials] Add Material', props<{ NewMaterialData: AddNewMaterial }>());
export const addMaterialSuccess = createAction('[Materials] Add Material Success', props<{ NewMaterialData: Material }>());
export const addMaterialFailure = createAction('[Materials] Add Material Failure', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction('[Materials] Delete Material Failure', props<{ error: any }>());