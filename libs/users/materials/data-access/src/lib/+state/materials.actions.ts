import { createAction, props } from '@ngrx/store';
import { Folder, Material, MaterialRes } from '../interfaces';
  
export const loadFolders = createAction('[Folders Page] load Folders');
export const loadFoldersSucces = createAction('[Folders Page] load Folders Succes', props<{folders: Folder[]}>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{id: number}>());
export const deleteFolderSucces = createAction('[Folders Page] Delete Folder Succes', props<{id: number}>());

export const addFolder = createAction('[Folder Page] Add Folder', props<{title: string}>());
export const addFolderSucces = createAction('[Folder Page] Add Folder Succes', props<{folder: Folder}>());

export const loadFolderId = createAction('[Mat Page] load Folder Id', props<{id: string}>());
export const loadFolderIdSucces = createAction('[Mat Page] load Folder Id Succes', props<{folder: Folder}>());

export const loadMat = createAction('[Mat Page] load Mat');
export const loadMatSucces = createAction('[Mat Page] load Mat Succes', props<{mats: Material[]}>());

export const deleteMat = createAction('[Mat Page] Delete Mat', props<{id: number}>());
export const deleteMatSucces = createAction('[Mat Page] Delete Mat Succes', props<{id: number}>());

export const addMat = createAction('[Mat Page] Add Mat', props<{res: MaterialRes}>());
export const addMatSucces = createAction('[Mat Page] Add Mat Succes', props<{mat: Material}>());

