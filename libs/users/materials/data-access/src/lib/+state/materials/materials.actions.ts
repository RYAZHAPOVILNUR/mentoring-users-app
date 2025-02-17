import { createAction, props } from '@ngrx/store';
import { CreateMaterialDTO, MaterialDTO } from '../models/material-model';

export const loadMaterials = createAction('[Materials Page] Load Materials');
export const loadMaterialsSuccess = createAction('[Materials/Api] Load Materials Success', props<{ materials: MaterialDTO[] }>());
export const loadMaterialsFailed = createAction('[Materials/Api] Load Materials Failed', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials/Api] Delete Material Success', props<{ id: number }>());
export const deleteMaterialrFailed = createAction('[Materials/Api] Delete Material Failed', props<{ error: any }>());

export const addMaterial = createAction('[Materials/Api] Add Material', props<{ material: CreateMaterialDTO }>());
export const addMaterialSuccess = createAction('[Materials/Api] Add Material Success', props<{ material: MaterialDTO }>());
export const addMaterialFailed = createAction('[Materials/Api] Add Material Failed', props<{ error: any }>());
