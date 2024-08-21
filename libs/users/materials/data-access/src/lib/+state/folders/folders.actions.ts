import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from './folders.reducer';
import { CreateFolderDTO, FolderType } from '@users/core/data-access';

export type onSuccessEditionCbType = () => void;

export const initFolders = createAction('[Folders Page] Init Folders');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FoldersEntity[]; }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any; }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<{ folderData: CreateFolderDTO; }>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folder Success', props<{ folder: FolderType; }>());
export const addFolderFailed = createAction('[Folders/Api] Add Folder Failed', props<{ error: any; }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ folderId: number }>());
export const deleteFolderSuccess = createAction('Folders/Api] Delete Folder Success', props<{ folderId: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: any }>());