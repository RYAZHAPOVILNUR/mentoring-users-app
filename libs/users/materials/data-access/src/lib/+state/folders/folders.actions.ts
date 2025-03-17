import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from '../../folders-dto/folders.entity';
import { LoadingStatus } from '@users/core/data-access';
import { AddFolderDTO, FoldersDTO } from '../../folders-dto/folders-dto.models';

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

export const addFolder = createAction('[Folders Page] add Folder', props<{ folderData: AddFolderDTO }>());
export const addFolderSuccess = createAction(
  '[Folders Page] Create Folder Success',
  props<{ folderData: AddFolderDTO }>()
);
export const addFolderFailed = createAction('[Folders Page] Create Folders failed', props<{ error: any }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folder Page] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folder Page] Delete Folder Failed', props<{ error: any }>());

export const editFolder = createAction('[Folder Page] Edit Folder', props<{ folder: AddFolderDTO; id: number }>());
export const editFolderSuccess = createAction('[Folder Page] Edit Folder Success', props<{ folder: FoldersDTO }>());
export const editFolderFailed = createAction('[Folder Page] Edit Folder Failed', props<{ error: any }>());
