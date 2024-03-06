import { IAddFolder, IFolder, } from '../model/folders-models';
import { createAction, props } from '@ngrx/store';

export const initMaterials = createAction('[Material Page] Init');

export const loadFolders = createAction('[Material Page] Load Folders');

export const loadFoldersSuccess = createAction('[Material Page] Load Folders Success', props<{ folders: IFolder[] }>());

export const loadFoldersFailed = createAction('[Material Page] Load Folders Failed');

export const addFolder = createAction('[Material Page] Add Folder', props<{ folder: IAddFolder }>());

export const addFolderSuccess = createAction('[Material Page] Add Folder Success',  props<{ newFolder: IFolder }>());

export const addFolderFailed = createAction('[Material Page] Add Folder Failed');

export const deleteFolder = createAction('[Material Page] delete Folder', props<{ id: number }>());

export const deleteFolderSuccess = createAction('[Material Page] delete Folder Success', props<{ id: number }>());

export const deleteFolderFailed = createAction('[Material Page] delete Folder Failed');

// export const initFolderMaterials = createAction('[Folder Page] Init')

// export const loadFolderMaterials = createAction('[Folder Page] Load Folder Materials')

// export const loadFolderMaterialsSuccess = createAction('[Folder Page] Load Folder Materials Success')

// export const loadFolderMaterialsFailed = createAction('[Folder Page] Load Folder Materials Failed')
