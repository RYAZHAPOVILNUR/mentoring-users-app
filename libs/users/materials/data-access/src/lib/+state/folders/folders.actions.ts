import { createAction, props } from '@ngrx/store';
import { CreateFolderDTO } from '../../models/folders-dto.model';
import { FoldersEntity } from '../../models/folders.entity';

export const initFolders = createAction('[Folders Page] Init');
export const loadFoldersSuccess = createAction(
  '[Folders/API] Load Folders Success', props<{ folders: FoldersEntity[] }>());
export const loadFoldersFailure = createAction(
  '[Folders/API] Load Folders Failure', props<{ error: any }>());

export const deleteFolder = createAction(
  '[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/API] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailure = createAction('[Folders/API] Delete Folder Failed', props<{ error: any }>());

export const createFolder = createAction('[Folders Page] Create Folder', props<{ folderData: CreateFolderDTO }>());
export const createFolderSuccess = createAction('[Folders/API] Create Folder Success', props<{ folder: FoldersEntity }>());
export const createFolderFailure = createAction('[Folders/API] Create Folder Failure', props<{ error: any }>());
