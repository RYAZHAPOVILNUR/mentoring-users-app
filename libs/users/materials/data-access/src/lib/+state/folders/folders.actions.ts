import { createAction, props } from '@ngrx/store';
import { ICreateFolder, IFolder } from '../../models/folders-model';
import { FoldersErrors } from './folders.reducer';

export const initFolders = createAction('[Folders Page] Init');

export const addFolder = createAction('[Folders Page] Add Folders', props<{ folder: ICreateFolder }>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folders Success', props<{ folder: IFolder }>());
export const addFolderFailed = createAction('[folders/Api] Add Folders Failed', props<{ error: FoldersErrors }>());

export const loadFolders = createAction('[Folders Page] Load Folders');
export const loadFoldersSuccess = createAction('[Folders/Api] Load Folders Success', props<{ folders: IFolder[] }>());
export const loadFoldersFailed = createAction('[folders/Api] Load Folders Failed', props<{ error: FoldersErrors }>());

export const deleteFolder = createAction('[Folders Page] Delete Folders', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folders Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[folders/Api] Delete Folders Failed', props<{ error: FoldersErrors }>());

export const openFolder = createAction('[Folders Page] Open Folders', props<{ id: number }>());
export const openFolderSuccess = createAction('[Folders/Api] Open Folders Success', props<{ folder: IFolder }>());
export const openFolderFailed = createAction('[folders/Api] Open Folders Failed', props<{ error: FoldersErrors }>());
