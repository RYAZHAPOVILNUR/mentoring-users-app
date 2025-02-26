import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from '../../folders-dto/folders.entity';
import { LoadingStatus } from '@users/core/data-access';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSuccess = createAction(
  '[Folders/Api] Load Folder Success',
  props<{ folders: FoldersEntity[] }>()
);

export const loadFoldersFailure = createAction('[Folder/Api] Load Folder Failure', props<{ error: Error }>());
// =======
export const loadFolder = createAction('[Folder/Api{ID}] Load Folder');

export const loadFolderSuccess = createAction(
  '[Folder/Api{ID}] Load Folder Success',
  props<{ folderData: FoldersEntity }>()
);

export const loadFolderFailed = createAction('[Folder/Api{ID}] Load Folder Failed', props<{ error: any }>());

export const updateFolderStatus = createAction(
  '[Folder/Api{ID}] Load Folder Status',
  props<{ status: LoadingStatus }>()
);
