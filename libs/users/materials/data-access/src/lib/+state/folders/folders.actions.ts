import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from '../../folders-dto/folders.entity';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSuccess = createAction(
  '[Folders/Api] Load Folder Success',
  props<{ folders: FoldersEntity[] }>()
);

export const loadFoldersFailure = createAction('[Folder/Api] Load Folder Failure', props<{ error: Error }>());
