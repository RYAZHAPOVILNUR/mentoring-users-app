import { createAction, props } from "@ngrx/store";
import { FoldersEntity } from "../../models/folders.entity";
import { CreateFoldersDTO } from "../../models/folders-dto.model";
import { FoldersErrors } from "./folders.reducer";

export const initFolders = createAction('[Folders Page] Init');
export const loadFoldersSuccess = createAction('[Folders /API] Load Folders Success', props<{ folders: FoldersEntity[] }>());
export const loadFoldersFailure = createAction('[Folders /API] Load Folders Failure', props<{ error: FoldersErrors }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders /API] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailure = createAction('[[Folders /API] Delete Folder Failure', props<{ error: FoldersErrors }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<{ folderData:CreateFoldersDTO }>());
export const addFolderSuccess = createAction('[Folders /API] Add Folder Success', props<{ folderData: FoldersEntity }>());
export const addFolderFailure = createAction('[Folders /API] Add Folder Failure', props<{ error: FoldersErrors }>());