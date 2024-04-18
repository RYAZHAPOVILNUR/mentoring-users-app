import { createAction, props } from '@ngrx/store';
import { FolderDTO, MaterialDTO } from './materials.models';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FolderDTO[] }>());

export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

export const setAddFolder = createAction('[ Add Folder] Set Add Folder', props<{ newData: { title: string } }>());
export const setAddFolderSuccess = createAction(
  '[ Add Folder] Set Add Folder Success',
  props<{ newData: FolderDTO }>()
);
export const setAddFolderFailed = createAction('[ Add Folder] Set Add Folder Failed', props<{ error: string }>());

export const setDeleteFolder = createAction('[ Delete Folder] Set Delete Folder', props<{ id: unknown }>());
export const setDeleteFolderSuccess = createAction(
  '[ Delete Folder] Set Delete Folder Success',
  props<{ id: unknown }>()
);
export const setDeleteFolderFailed = createAction(
  '[ Delete Folder] Set Delete Folder Failed',
  props<{ error: Error }>()
);

export const initMaterials = createAction('[Folder detail Page] Init Materials', props<{ id: unknown }>());

export const loadMaterialsSuccess = createAction(
  '[Materials/API] Load Materials Success',
  props<{ materials: MaterialDTO[] }>()
);

export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());

export const setAddMaterial = createAction('[ Add Material] Set Add Material', props<{ data: MaterialDTO }>());
export const setAddMaterialSuccess = createAction(
  '[ Add Material] Set Add Material Success',
  props<{ data: MaterialDTO }>()
);
export const setAddMaterialFailed = createAction('[ Add Material] Set Add Material Failed', props<{ error: Error }>());

export const setDeleteMaterial = createAction('[ Delete Material] Set Delete Material', props<{ id: number }>());
export const setDeleteMaterialSuccess = createAction(
  '[ Delete Material] Set Delete Material Success',
  props<{ id: number }>()
);
export const setDeleteMaterialFailed = createAction(
  '[ Delete Material] Set Delete Material Failed',
  props<{ error: Error }>()
);
