import { createAction, props } from '@ngrx/store';
import { FolderInterface } from '../interfaces/folder.interface';


export const loadFolders = createAction('[Folders] Load Folders');
export const loadFoldersSuccess = createAction('[Folders] Load Folders Success', props<{ folders: FolderInterface[] }>());
export const loadFoldersFailure = createAction('[Folders] Load Folders Failure', props<{error: any}>)
