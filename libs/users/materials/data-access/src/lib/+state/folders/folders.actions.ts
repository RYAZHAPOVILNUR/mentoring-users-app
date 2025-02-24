import { createAction, props } from '@ngrx/store';
import { CreateFolderDTO, FoldersDTO, UsersEntity } from '../../../../../../../core/data-access/src';


export const initFolders = createAction('[Folders Page] Init');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: any[] }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

export const addFolder = createAction('[Folders/API] Add Folder', props<{ folder: CreateFolderDTO }>());
export const addFolderSuccess = createAction('[Folders/API] Add FolderSuccess', props<{ folder: FoldersDTO }>());
export const addFolderFailure = createAction('[Folders/API] Add FolderFailure', props<{ error: any }>());
