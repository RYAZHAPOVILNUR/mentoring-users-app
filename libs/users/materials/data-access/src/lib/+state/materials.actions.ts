import { createAction, props } from '@ngrx/store';
import { Folder } from './materials.model';

export const getFolders = createAction(
  '[Folders] Get Folders'
);
export const getFoldersSuccess = createAction(
  '[Folders] Get Folders Success', 
  props<{ folders: Folder[] }>()
);
export const getFoldersFailure = createAction(
  '[Folders] Get Folders Failure',
  props<{ error: string }>()
);