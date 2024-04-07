import { createAction, props } from "@ngrx/store";

import { FolderAdd } from "../models/folder-add.model";
import { Folder } from "../models/folder.model";
import { MaterialAdd } from "../models/material-add.model";
import { Material } from "../models/material.model";

export const initFolders = createAction('[Folders] Initial Folders');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: Folder[] }>());
export const loadFoldersFaild = createAction('[Folders/API] Load Folders Faild', props<{ error: any }>());

export const createFolders = createAction('[Folders] Create Folders', props<{ folder: FolderAdd }>());
export const createFoldersSuccess = createAction('[Folders] Create Folders Success', props<{ folder: Folder}>());
export const createFoldersFaild = createAction('[Folders] Create Folders Faild', props<{ error: any }>());

export const deleteFolders = createAction('[Folders] Delete Folders', props<{ id: number }>());
export const deleteFoldersSuccess = createAction('[Folders/API] Delete Folders Success', props<{ id: number }>());
export const deleteFoldersFaild = createAction('[Folders/API] Delete Folders Faild', props<{ error: any }>());

export const loadMaterials = createAction('[Materials] Load Materials', props<{ folder_id: number }>());
export const loadMaterialsSuccess = createAction('[Materials/API] Load Materials Success', props<{ materials: Material[]}>());
export const loadMaterialsFaild = createAction('[Materials/API] Load Materials Faild', props<{ error: any }>());

export const createMaterials = createAction('[Materials] Create Materials', props<{ material: MaterialAdd }>());
export const createMaterialsSuccess = createAction('[Materials/API] Create Materials Success',  props<{ material: Material}>());
export const createMaterialsFaild = createAction('[Materials/API] Create Materials Faild', props<{ error: any }>());

export const deleteMaterials = createAction('[Materials] Delete Materials', props<{ material_id: number }>());
export const deleteMaterialsSuccess = createAction('[Materials/API]  Delete Materials Success', props<{ material_id: number }>());
export const deleteMaterialsFaild = createAction('[Materials/API] Delete Materials Faild', props<{ error: any }>());