import { createAction, props } from '@ngrx/store';
import { IMaterial } from '../../models/material.model';
import { IAddMaterial } from '../../models/material-add.model';

export const loadMaterials = createAction('[Materials Page] Load Materials');
export const loadMaterialsSuccess = createAction('[Materials Page] Load Materials Success', props<{materials: IMaterial[] }>()); 
export const loadMaterialsFailure = createAction('[Materials Page] Load Materials Failure', props<{ error: any }>()); 

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials Page] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction('[Materials Page] Delete Material Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials Page] Add Material', props<{ material: IAddMaterial }>());
export const addMaterialSuccess = createAction('[Materials Page] Add Material Success', props<{ material: IMaterial }>());
export const addMaterialFailure = createAction('[Materials Page] Add Material Failure', props<{ error: any }>());
