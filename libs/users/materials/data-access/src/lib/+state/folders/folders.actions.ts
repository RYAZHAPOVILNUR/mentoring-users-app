import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from '../../folders-dto/folders.entity';
import { LoadingStatus } from '@users/core/data-access';

export const initFolders = createAction('[Folders Page] Init');

export const loadfolders = createAction('[Folder Page] Load Folder');

export const loadFoldersSuccess = createAction(
  '[Folders/Api] Load Folder Success',
  props<{ folders: FoldersEntity[] }>()
);

export const loadFolderFailure = createAction('[Folder/Api] Load Folder Failure', props<{ error: Error }>());

export const loadFolderFailed = createAction('[Folders/Api] Load Folder Failed', props<{ error: Error }>());

export const updateFolderStatus = createAction(
  '[Folders Detail] Update Folder Status',
  props<{ status: LoadingStatus }>()
);
