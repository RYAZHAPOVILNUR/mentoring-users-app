import { createAction, props } from '@ngrx/store';
import { IFoldersActionSuccess } from '../models/folders/folder-action-success.interface';

export const loadFolders = createAction('[Materials Page] Load Folders');

export const loadFolderSuccess = createAction('[Materials Page] Load Folder Success', props<IFoldersActionSuccess>());

export const loadFolderFailure = createAction(
  '[Materials Page] Load Folder Failure',
  props<{
    error: any;
  }>()
);
console.log('Убрать any из error');

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
