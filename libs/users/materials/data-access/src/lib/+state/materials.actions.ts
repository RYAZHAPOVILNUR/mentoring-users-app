import { createAction, props } from '@ngrx/store';
import { IAddFolder, IFolder, IMaterial, MaterialsError } from './materials.reducer';

export const loadFolders = createAction('[Folders] Load Folders');
export const loadFoldersSuccess = createAction('[Folders] Load Folders Success', props<{ folders: IFolder[] }>());
export const loadFoldersFailure = createAction('[Folders] Load Folders Failure', props<{ error: MaterialsError }>());

export const addFolder = createAction('[Folders] Add Folder', props<{ folder: IAddFolder }>());
export const addFolderSuccess = createAction('[Folders] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailure = createAction('[Folders] Add Folder Failure', props<{ error: MaterialsError }>());

export const deleteFolder = createAction('[Folders] Delete Folder', props<{ id: string }>());
export const deleteFolderSuccess = createAction('[Folders] Delete Folder Success', props<{ id: string }>());
export const deleteFolderFailure = createAction('[Folders] Delete Folder Failure', props<{ error: MaterialsError }>());

export const openFolder = createAction('[Folders] Open Folder');
export const openFolderSuccess = createAction('[Folders] Open Folder Success', props<{ folder: IFolder }>());
export const openFolderFailure = createAction('[Folders] Open Folder Failure', props<{ error: MaterialsError }>());

export const resetState = createAction('[Folders] Reset State');

export const loadMaterials = createAction('[Materials] Load Materials');
export const loadMaterialsSuccess = createAction(
  '[Materials] Load Materials Success',
  props<{ materials: IMaterial[] }>()
);
export const loadMaterialsFailure = createAction(
  '[Materials] Load Materials Failure',
  props<{ error: MaterialsError }>()
);

export const addMaterial = createAction('[Materials] Add Material', props<{ material: IMaterial }>());
export const addMaterialSuccess = createAction('[Materials] Add Material Success', props<{ material: IMaterial }>());
export const addMaterialFailure = createAction('[Materials] Add Material Failure', props<{ error: MaterialsError }>());

export const deleteMaterial = createAction('[Materials] Delete Material', props<{ materialId: string }>());
export const deleteMaterialSuccess = createAction(
  '[Materials] Delete Material Success',
  props<{ materialId: string }>()
);
export const deleteMaterialFailure = createAction(
  '[Materials] Delete Material Failure',
  props<{ error: MaterialsError }>()
);

export const openMaterial = createAction('[Materials] Open Material', props<{ material: IMaterial }>());
export const openMaterialSuccess = createAction('[Materials] Open Material Success', props<{ material: IMaterial }>());
export const openMaterialFailure = createAction(
  '[Materials] Open Material Failure',
  props<{ error: MaterialsError }>()
);
