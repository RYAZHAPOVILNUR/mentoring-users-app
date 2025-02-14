import { createAction, props } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { CreateFolderDTO, FoldersEntity } from '../../models/folders.interface';

export const initFolders = createAction('[Materials Page] Folders Init');
export const loadFoldersSuccess = createAction(
  '[Materials/API] Load Folders Success',
  props<{ folders: FoldersEntity[] }>()
);
export const loadFoldersFailure = createAction('[Materials/API] Load Folders Failure', props<{ error: any }>());

export const loadFolder = createAction('[Materials Page] Load Folder');
export const loadFolderSuccess = createAction(
  '[Materials/API] Load Folder Success',
  props<{ folderData: FoldersEntity }>()
);
export const loadFolderFailed = createAction('[Materials/API] Load Folder Failed', props<{ error: any }>());
export const updateFolderStatus = createAction(
  '[Materials Page] Update Folder Status',
  props<{ status: LoadingStatus }>()
);

export const addFolder = createAction('[Materials Page] Add Folder', props<{ folderData: CreateFolderDTO }>());
export const addFolderSuccess = createAction(
  '[Materials/API] Add Folder Success',
  props<{ folderData: FoldersEntity }>()
);
export const addFolderFailed = createAction('[Materials/API] Add Folder Failed', props<{ error: any }>());

export const deleteFolder = createAction('[Materials Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Materials/API] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Materials/API] Delete Folder Failed', props<{ error: any }>());
