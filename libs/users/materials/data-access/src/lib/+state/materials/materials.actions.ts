import { createAction, props } from '@ngrx/store';
import { TMaterial, TAddMaterial } from '../../models/material.type';
import { AppError } from '../folders/folders.actions';

export const loadMaterials = createAction('[Materials Page] Load Materialss');
export const loadMaterialsSuccess = createAction(
  '[Materials/API] Load Materialss Success',
  props<{ materials: TMaterial[] }>()
);
export const loadMaterialsFailure = createAction(
  '[Materials/API] Load Materialss Failure',
  props<{ error: AppError }>()
);

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials/Api] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailed = createAction(
  '[Materials/Api] Delete Material Failed',
  props<{ error: AppError }>()
);

export const addMaterial = createAction('[Materials Page] Add Material', props<{ materialData: TAddMaterial }>());
export const addMaterialSuccess = createAction(
  '[Materials/Api] Add Material Success',
  props<{ materials: TMaterial }>()
);
export const addMaterialFailed = createAction('[Materials/Api] Add Material Failed', props<{ error: AppError }>());
