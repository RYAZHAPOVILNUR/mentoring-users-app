import { createAction, props } from '@ngrx/store';
import { AddNewFolder, FolderInterface } from '../interfaces/folder.interface';
import { AddNewMaterialReq, MaterialInterface } from '../interfaces/material.interface';


export const loadFolders = createAction('[Folders] Load Folders');
export const loadFoldersSuccess = createAction('[Folders] Load Folders Success', props<{
  folders: FolderInterface[]
}>());
export const loadFoldersFailure = createAction('[Folders] Load Folders Failure', props<{ error: any }>());

export const addFolder = createAction('[Material Page] Add Folder', props<{ newFolderData: AddNewFolder }>());
export const addFolderSuccess = createAction(
  '[Folders] Add Folder Success',
  props<{ newFolderData: FolderInterface }>()
);
export const addFolderFailed = createAction('[Materials/Api] Add Folder Failed', props<{ error: any }>());

export const deleteFolder = createAction('[Folders] Delete Folder', props<{folderId: number}>())
export const deleteFolderSuccess = createAction('[Folders] Delete Folder Success', props<{folderId: number}>())
export const deleteFolderFailure = createAction('[Folders] Delete Folder Failure', props<{error: any}>())

export const loadMaterialsFolders = createAction('[Material Folders] Load Material Folders');
export const loadMaterialsFoldersSuccess = createAction('[Material Folders] Load Material Folders Success', props<{materialFolders: MaterialInterface[]}>());
export const loadMaterialsFoldersFailure = createAction('[Material Folders] Load Material Folders Failure', props<{error: any}>())

export const addMaterialFolder = createAction('[Material Page] Add Material Folder', props<{ newMaterialFolderData: AddNewMaterialReq }>());
export const addMaterialFolderSuccess = createAction(
  '[Material Folders] Add Material Folder Success',
  props<{ newMaterialFolderData: MaterialInterface }>()
);
export const addMaterialFolderFailed = createAction('[Materials/Api] Add Material Folder Failed', props<{ error: any }>());

export const deleteMaterialFolder = createAction('[Materials] Delete Material Folder', props<{materialFolderId: number}>())
export const deleteMaterialFolderSuccess = createAction('[Materials] Delete Material Folder Success', props<{materialFolderId: number}>())
export const deleteMaterialFolderFailure = createAction('[Materials] Delete Material Folder Failure', props<{error: any}>())
