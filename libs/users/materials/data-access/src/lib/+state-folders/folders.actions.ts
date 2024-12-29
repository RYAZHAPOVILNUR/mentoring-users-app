import { props, createAction } from '@ngrx/store';
import { AddFoldersType, FoldersType } from '../models/folder.type';

export interface AppError {
    message: string;
    statusCode?: number;  
}

export const initFolders = createAction('[Folders Page] Init')
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FoldersType[] }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: AppError }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: AppError }>());

export const addFolder = createAction('[Folders Page] Add Folders', props< AddFoldersType >());
export const addFolderSuccess = createAction('[Folders/Api] Add Folders Success', props<{ folder: FoldersType }>());
export const addFolderFailed = createAction('[Folders/Api] Add Folders Failed', props<{ error: AppError }>());