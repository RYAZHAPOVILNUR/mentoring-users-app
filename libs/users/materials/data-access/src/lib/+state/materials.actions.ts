import { createAction, props } from '@ngrx/store';
import { AddNewFolder, FolderInterface } from '../interfaces/folder.interface';


export const loadFolders = createAction('[Folders] Load Folders');
export const loadFoldersSuccess = createAction('[Folders] Load Folders Success', props<{
  folders: FolderInterface[]
}>());
export const loadFoldersFailure = createAction('[Folders] Load Folders Failure', props<{ error: any }>());

export const addFolder = createAction('[Material Page] Add Folder', props<{ newFolderData: AddNewFolder }>());
export const addFolderSuccess = createAction(
  '[Folders] Add Folder Success',
  props<{ newFolderData: FolderInterface }>()
);
export const addFolderFailed = createAction('[Materials/Api] Add Folder Failed', props<{ error: any }>());

export const deleteFolder = createAction('[Folders] Delete Folder', props<{folderId: number}>())
export const deleteFolderSuccess = createAction('[Folders] Delete Folder Success', props<{folderId: number}>())
export const deleteFolderFailure = createAction('[Folders] Delete Folder Failure', props<{error: any}>())
