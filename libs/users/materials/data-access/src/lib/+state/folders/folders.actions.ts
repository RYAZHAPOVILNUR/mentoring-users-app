import { createAction, emptyProps, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO} from '../models/folder-models';

export const loadFolders = createAction('[Folders Page] Load Folders');
export const loadFoldersSuccess = createAction('[Folders/Api] Load Folders Success', props<{ folders: FolderDTO[] }>());
export const loadFolderFailed = createAction('[Folders/Api] Load Folders Failed', props<{ error: any }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: any }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<{ folder: CreateFolderDTO }>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folder Success', props<{ folder: FolderDTO }>());
export const addFolderFailed = createAction('[Folders/Api] Add Folder Failed', props<{ error: any }>());


export const openFolder = createAction( '[Folders Page] Open Folder', props<{ id: number }>() );
export const openFolderSuccess = createAction('[Folders/Api] Open Folder Success', props<{ folder: FolderDTO }>());
export const openFolderFailed = createAction('[Folders/Api] Open Folder Failed', props<{ error: any }>());

