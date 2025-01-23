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
