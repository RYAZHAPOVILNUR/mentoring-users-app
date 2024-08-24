import { createAction, props } from '@ngrx/store';
import { FolderType } from './folder.materials.model';
import { LoadingStatus } from '@users/core/data-access';

export type onSuccessEditionCbType = () => void;

/* Folders actions */

export const loadFolders = createAction('[Folders Page] Load Folders')
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FolderType[] }>())
export const loadFoldersFailed = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>())

export const deleteFolder = createAction('[Folders Page] Delete New Folder', props<{ id: number }>())
export const deleteFolderSuccess = createAction('[Folders/API] Delete New Folder Success', props<{ id: number }>())
export const deleteFolderFailed = createAction('[Folders/API] Delete New Folder Failure', props<{ error: any }>())

export const addFolder = createAction('[Folders Page] Add New Folder', props<{ folder: FolderType }>())
export const addFolderSuccess = createAction('[Folders/API] Add New Folder Success', props<{ folder: FolderType }>())
export const addFolderFailed = createAction('[Folders/API] Add New Folder Failure', props<{ error: any }>())

export const loadFolder = createAction('[Folders Page] Load Folder')
export const loadFolderSuccess = createAction('[Folders Page] Load Folder Success', props<{ folder: FolderType }>())
export const loadFolderFailed = createAction('[Folders Page] Load Folder Failure', props<{ error: any }>())

export const updateFolderStatus = createAction('[Users Detail] Update Folder Status', props<{ status: LoadingStatus }>());
