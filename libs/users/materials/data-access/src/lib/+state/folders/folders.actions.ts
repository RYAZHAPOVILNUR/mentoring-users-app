import { createAction, props } from '@ngrx/store';
import { FolderModel } from '../../models/folder.model';

export const loadFolder = createAction('[Folders] Load Folder');
export const loadFolderSuccess = createAction('[Folders] Load Folder Success', props<{ folder: FolderModel }>());
export const loadFolderFailure = createAction('[Folders] Load Folder Failure', props<{ error: string }>());

export const loadAllFolders = createAction('[Folders] Load All Folders');
export const loadAllFoldersSuccess = createAction(
  '[Folders] Load All Folders Success',
  props<{ folders: FolderModel[] }>()
);
export const loadAllFoldersFailure = createAction('[Folders] Load All Folders Failure', props<{ error: string }>());
