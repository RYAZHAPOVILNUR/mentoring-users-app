import { createAction, props } from '@ngrx/store';
import { IFoldersActionSuccess } from '../../models/folders/folder-action-success.model';
import { TCreateFolderDTO } from '../../models/folders/folder-dto.model';
import { TFolderEntity } from '../../models/folders/folder.entity';

export const loadFolders = createAction('[Materials Page] Load Folders');

export const loadFolderSuccess = createAction('[Materials Page] Load Folder Success', props<IFoldersActionSuccess>());

export const loadFolderFailure = createAction(
  '[Materials Page] Load Folder Failure',
  props<{
    error: any;
  }>()
);

export const deleteFolder = createAction(
  '[Materials Page] Delete Folder',
  props<{
    id: number;
  }>()
);

export const deleteFolderSuccess = createAction(
  '[Materials Page] Delete Folder Success',
  props<{
    id: number;
  }>()
);

export const deleteFolderFailed = createAction(
  '[Materials Page] Delete Folder Failed',
  props<{
    error: any;
  }>()
);

export const addFolder = createAction(
  '[Materials Page] Add Folder',
  props<{
    folderData: TCreateFolderDTO;
  }>()
);

export const addFolderSuccess = createAction(
  '[Materials Page] Add Folder Success',
  props<{
    folderData: TFolderEntity;
  }>()
);

export const addFolderFailed = createAction(
  '[Materials Page] Add Folder Failed',
  props<{
    error: any;
  }>()
);
