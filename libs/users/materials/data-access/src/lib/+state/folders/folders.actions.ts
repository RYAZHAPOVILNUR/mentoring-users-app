import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from './folders.models';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSuccess = createAction(
  '[Folders/API] Load Folders Success',
  props<{ folders: FoldersEntity[] }>()
);

export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());
