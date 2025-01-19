import { createAction, props } from '@ngrx/store';
import { IAddFolder } from '../models/folder-add.model';
import { IFolder } from '../models/folder.model';

export const addFolder = createAction('[Materials Folder] Add Folder', props<{ folder: IAddFolder }>());
export const addFolderSuccess = createAction('[Materials Folder] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailed = createAction('[Materials Folder] Add Folder Failed', props<{ error: string }>());
