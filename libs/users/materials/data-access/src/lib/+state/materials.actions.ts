import { createAction, props } from "@ngrx/store";
import { Folder, FolderCreate } from "./models/folders.interface";
import { Material, MaterialCreate } from './models/materials.interface';

export const loadFolders = createAction('[FOLDERS], Load folders');
export const loadFoldersSuccess = createAction('[FOLDERS], Load folders success', props<{folders: Folder[]}>());
export const loadFoldersFailure = createAction('[FOLDERS], Load folders failure', props<{error: Error}>());

export const deleteFolders = createAction('[FOLDERS], delete folders', props<{id: number}>());
export const deleteFoldersSuccess = createAction('[FOLDERS], delete folders success', props<{id: number}>());
export const deleteFoldersFailure = createAction('[FOLDERS], delete folders failure', props<{error: Error}>());

export const addFolder = createAction('[FOLDER], add folder', props<{folder: FolderCreate}>());
export const addFolderSuccess = createAction('[FOLDER], add folder success', props<{folder: Folder}>());
export const addFolderFailure = createAction('[FOLDER], add folder failure', props<{error: Error}>());

export const loadMaterial = createAction('[MATERIAL], load material');
export const loadMaterialSuccess = createAction('[MATERIAL], load material success', props<{materials: Material[]}>());
export const loadMaterialFailure = createAction('[MATERIAL], load material failure', props<{error: Error}>());

export const deleteMaterial = createAction('[MATERIAL], delete material', props<{id: number}>());
export const deleteMaterialSuccess = createAction('[MATERIAL], delete material success', props<{id: number}>());
export const deleteMaterialFailure = createAction('[MATERIAL], delete material failure', props<{error: Error}>());

export const addMaterial = createAction('[MATERIAL], add material', props<{material: MaterialCreate}>());
export const addMaterialSuccess = createAction('[MATERIAL], add material success', props<{material: Material}>());
export const addMaterialFailure = createAction('[MATERIAL], add material failure', props<{error: Error}>());
