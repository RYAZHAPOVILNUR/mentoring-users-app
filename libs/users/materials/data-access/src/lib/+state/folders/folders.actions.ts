import { createAction, props } from '@ngrx/store';
import { IFolder, IAddFolder } from '../../models/folder.model';

export interface AppError {
  mesage: string;
  statusCode: number;
}

export const loadFolders = createAction('[Folders Page] Load Folders');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: IFolder[] }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: AppError }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: AppError }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<IAddFolder>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailed = createAction('[Folders/Api] Add Folder Failed', props<{ error: AppError }>());
