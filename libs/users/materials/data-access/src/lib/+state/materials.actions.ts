import { createAction, props } from '@ngrx/store';
import { Folder } from './interfaces';
  
export const initFolders = createAction('[Folders Page] Init Folders');
export const getFolders = createAction('[Folders Page] Get Folders', props<{folder: Folder[]}>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{id: number}>());
export const deleteFolderSucces = createAction('[Folders Page] Delete Folder Succes', props<{id: number}>());

export const addFolder = createAction('[Folder Page] Add Folder', props<{title: string}>());
export const addFolderSucces = createAction('[Folder Page] Add Folder Succes', props<{folder: Folder}>());
