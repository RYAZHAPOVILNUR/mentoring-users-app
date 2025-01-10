import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from './folders.models';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSuccess = createAction(
  '[Folders/API] Load Folders Success',
  props<{ folders: FoldersEntity[] }>()
);

export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

export const addFolder = createAction('[Folders/API] Add Folder', props<{ title: string }>());
export const addFolderSuccess = createAction('[Folders/API] Add Folder Success', props<{ folder: FoldersEntity }>());
export const addFolderFailure = createAction('[Folders/API] Add Folder Failure', props<{ error: any }>());
export const deleteFolder = createAction('[Folders/API] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction( '[Folders/API] Delete Folder Success' ,props< {id: number}>());
export const deleteFolderFailure = createAction('[Folders/API] Delete Folder Failure', props<{ error: any }>());
