import { createAction, props } from '@ngrx/store';
import { IAddFolder } from '../models/folder-add.model';
import { IFolder } from '../models/folder.model';
import { IAddMaterial } from '../models/materials-add.model';
import { IMaterial } from '../models/materials.model';
import { FoldersErrors } from './materials.reducer';

export const initFolders = createAction('[Materials Folder] Init');
export const loadFoldersSuccess = createAction(
  '[Materials Folder] Load All Folders Success',
  props<{ folders: IFolder[] }>()
);
export const loadFoldersFailed = createAction(
  '[Materials Folder] Load All Folders Failed',
  props<{ error: FoldersErrors | null }>()
);

export const addFolder = createAction('[Materials Folder] Add Folder', props<{ folder: IAddFolder }>());
export const addFolderSuccess = createAction('[Materials Folder] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailed = createAction(
  '[Materials Folder] Add Folder Failed',
  props<{ error: FoldersErrors | null }>()
);

export const deleteFolder = createAction('[Materials Folder] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Materials Folder] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction(
  '[Materials Folder] Delete Folder Failed',
  props<{ error: FoldersErrors | null }>()
);

export const loadFolder = createAction('[Materials Folder] Load Folder');
export const loadFolderSuccess = createAction('[Materials Folder] Load Folder Success', props<{ folder: IFolder }>());
export const loadFolderFailed = createAction(
  '[Materials Folder] Load Folder Failed',
  props<{ error: FoldersErrors | null }>()
);

export const initMaterials = createAction('[Materials Materials] Init');
export const loadMaterialsSuccess = createAction(
  '[Materials Materials] Load All Materials Success',
  props<{ materials: IMaterial[] }>()
);
export const loadMaterialsFailed = createAction(
  '[Materials Materials] Load All Materials Failed',
  props<{ error: FoldersErrors | null }>()
);

export const addMaterial = createAction('[Materials] Add Material', props<{ material: IAddMaterial }>());
export const addMaterialSuccess = createAction('[Materials] Add Material Success', props<{ material: IMaterial }>());
export const addMaterialFailed = createAction(
  '[Materials] Add Material Failed',
  props<{ error: FoldersErrors | null }>()
);

export const deleteMaterial = createAction('[Materials] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailed = createAction(
  '[Materials] Delete Material Failed',
  props<{ error: FoldersErrors | null }>()
);
