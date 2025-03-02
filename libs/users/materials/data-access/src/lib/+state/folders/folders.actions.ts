import { createAction, props } from '@ngrx/store';
import { CreateFolderDTO, FoldersDTO, LoadingStatus, UsersEntity } from '../../../../../../../core/data-access/src';


export const initFolders = createAction('[Folders Page] Init');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FoldersDTO[] }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

export const addFolder = createAction('[Folders/API] Add Folder', props<{ folder: CreateFolderDTO }>());
export const addFolderSuccess = createAction('[Folders/API] Add FolderSuccess', props<{ folder: FoldersDTO }>());
export const addFolderFailure = createAction('[Folders/API] Add FolderFailure', props<{ error: any }>());

export const deleteFolder = createAction('[Folders/API] Delete Folder', props<{ folderId: number }>());
export const deleteFolderSuccess = createAction('[Folders/API] Delete FolderSuccess', props<{ folderId: number }>());
export const deleteFolderFailure = createAction('[Folders/API] Delete FolderFailure', props<{ error: any }>());

export const loadFolder = createAction('[Folder Page] Load Folder');
export const loadFolderSuccess = createAction('[Folders/Api] Load Folder Success', props<{ folder: any }>());
export const loadFolderFailed = createAction('[Folders/Api] Load Folder Failed', props<{ error: any }>());



export const updateFolderStatus = createAction('[Folders Detail] Update Folder Status', props<{ status: LoadingStatus }>());
