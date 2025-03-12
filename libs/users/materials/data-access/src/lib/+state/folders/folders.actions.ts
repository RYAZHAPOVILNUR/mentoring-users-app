import { createAction, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO } from '../../models/folders.models';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FolderDTO[] }>());

export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: any }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<{ folderData: CreateFolderDTO }>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folder Success', props<{ folderData: FolderDTO }>());
export const addFolderFailed = createAction('[Folders/Api] Add Folder Failed', props<{ error: any }>());



export const openFolder = createAction( '[Folders Page] Open Folder', props<{ id: number }>() );
export const openFolderSuccess = createAction('[Folders/Api] Open Folder Success', props<{ folder: FolderDTO }>());
export const openFolderFailed = createAction('[Folders/Api] Open Folder Failed', props<{ error: any }>());