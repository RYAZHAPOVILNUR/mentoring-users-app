import { createAction, props } from '@ngrx/store';
import { FolderDTO } from '../models/folder.model';

export const loadFolders = createAction('[Folders] Load Folders');
export const loadFoldersSuccess = createAction(
  '[Folders] Load Folders Success',
  props<{ folders: FolderDTO[] }>()
);
export const loadFoldersFailure = createAction(
  '[Folders] Load Folders Failure',
  props<{ error: any }>()
);
