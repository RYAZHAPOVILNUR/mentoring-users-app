import { createAction, props } from '@ngrx/store';
import { IAddFolder } from '../models/folder-add.model';
import { IFolder } from '../models/folder.model';

export const loadFolders = createAction('[Materials Folder] Load All Folders');
export const loadFoldersSuccess = createAction(
  '[Materials Folder] Load All Folders Success',
  props<{ folders: IFolder[] }>()
);
export const loadFoldersFailed = createAction('[Materials Folder] Load All Folders Failed', props<{ error: string }>());

export const addFolder = createAction('[Materials Folder] Add Folder', props<{ folder: IAddFolder }>());
export const addFolderSuccess = createAction('[Materials Folder] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailed = createAction('[Materials Folder] Add Folder Failed', props<{ error: string }>());

export const deleteFolder = createAction('[Materials Folder] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Materials Folder] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Materials Folder] Delete Folder Failed', props<{ error: string }>());
