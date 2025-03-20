import { createAction, props } from '@ngrx/store';
import { ICreateMaterial, IMaterial } from '../../models/materials-models';
import { MaterialsErrors } from './materials.reducer';

export const addMaterial = createAction('[Material Page] Add Materials', props<{ material: ICreateMaterial }>());
export const addMaterialSuccess = createAction('[Material/Api] Add Materials', props<{ material: IMaterial }>());
export const addMaterialFailed = createAction('[Material/Api] Add Materials', props<{ error: MaterialsErrors }>());

export const loadMaterials = createAction('[Material Page] Load Materials', props<{ folderId: number }>());
export const loadMaterialsSuccess = createAction('[Material/Api] Load Materials', props<{ materials: IMaterial[] }>());
export const loadMaterialsFailed = createAction('[Material/Api] Load Materials', props<{ error: MaterialsErrors }>());

export const deleteMaterial = createAction('[Material Page] Delete Materials', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Material/Api] Delete Materials', props<{ id: number }>());
export const deleteMaterialFailed = createAction('[Material/Api] Delete Materials', props<{ error: MaterialsErrors }>());
