import { FolderEntity, MaterialEntity, AddMaterialEntity} from '../model/material.entity';
import { AddFolderDTO } from '../model/material-dto.model'

import { createAction, props } from '@ngrx/store';

export const initMaterials = createAction('[Material Page] Init');

export const loadFolders = createAction('[Material Page] Load Folders');

export const loadFoldersSuccess = createAction('[Material Page] Load Folders Success', props<{ folders: FolderEntity[] }>());

export const loadFoldersFailed = createAction('[Material Page] Load Folders Failed');

export const addFolder = createAction('[Material Page] Add Folder', props<{ folder: AddFolderDTO }>());

export const addFolderSuccess = createAction('[Material Page] Add Folder Success',  props<{ newFolder: FolderEntity }>());

export const addFolderFailed = createAction('[Material Page] Add Folder Failed');

export const deleteFolder = createAction('[Material Page] Delete Folder', props<{ id: number }>());

export const deleteFolderSuccess = createAction('[Material Page] Delete Folder Success', props<{ id: number }>());

export const deleteFolderFailed = createAction('[Material Page] Delete Folder Failed');

export const initFolderMaterials = createAction('[Folder Page] Init')

export const loadMaterials = createAction('[Folder Page] Load Folder Materials')

export const loadMaterialsSuccess = createAction('[Folder Page] Load Folder Materials Success', props<{materials:MaterialEntity[]}>())

export const loadMaterialsFailed = createAction('[Folder Page] Load Folder Materials Failed')

export const addMaterial = createAction('[Folder Page] Add Material', props<{material:AddMaterialEntity}>())

export const addMaterialSuccess = createAction('[Folder Page] Add Material Success', props<{material:MaterialEntity}>())

export const addMaterialFailed = createAction('[Folder Page] Add Material Failed')

export const deleteMaterial = createAction('[Folder Page] Delete Material', props<{id: number}>())

export const deleteMaterialSuccess = createAction('[Folder Page] Delete Material Success', props<{id: number}>())

export const deleteMaterialFailed = createAction('[Folder Page] Delete Material Failed')
