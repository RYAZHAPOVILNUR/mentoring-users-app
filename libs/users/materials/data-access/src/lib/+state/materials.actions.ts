import { createAction, props } from '@ngrx/store';
import { Folder, Mat, MatRes } from './interfaces';
  
export const initFolders = createAction('[Folders Page] Init Folders');
export const getFolders = createAction('[Folders Page] Get Folders', props<{folder: Folder[]}>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{id: number}>());
export const deleteFolderSucces = createAction('[Folders Page] Delete Folder Succes', props<{id: number}>());

export const addFolder = createAction('[Folder Page] Add Folder', props<{title: string}>());
export const addFolderSucces = createAction('[Folder Page] Add Folder Succes', props<{folder: Folder}>());

export const getFolderId = createAction('[Mat Page] Get Folder Id', props<{id: string}>());
export const getFolderIdSucces = createAction('[Mat Page] Get Folder Id Succes', props<{folder: Folder}>());

export const getMat = createAction('[Mat Page] Get Mat');
export const getMatSucces = createAction('[Mat Page] Get Mat Succes', props<{mats: Mat[]}>());

export const deleteMat = createAction('[Mat Page] Delete Mat', props<{id: number}>());
export const deleteMatSucces = createAction('[Mat Page] Delete Mat Succes', props<{id: number}>());

export const addMat = createAction('[Mat Page] Add Mat', props<{res: MatRes}>());
export const addMatSucces = createAction('[Mat Page] Add Mat Succes', props<{mat: Mat}>());

