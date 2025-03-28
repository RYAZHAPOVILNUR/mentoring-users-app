import { createAction, props } from '@ngrx/store';
import { FoldersModel, FoldersSecondModel } from '../../../../folders-model';

export const initFolder = createAction('[Folders Page] Init');

export const loadFolders = createAction('[Folders Page] Load Folders');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FoldersSecondModel[] }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: any }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<{folder: FoldersModel}>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folder Success', props<{ folder: FoldersSecondModel }>());
export const addFolderFailed = createAction('[Folders/Api] Add Folder Failed', props<{ error: any }>());
