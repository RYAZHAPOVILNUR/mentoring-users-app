import { createAction, props } from '@ngrx/store';
import { IMaterial } from '../models/material.model';

export const loadMaterials = createAction('[Materials Page] Load Materials');
export const loadMaterialsSuccess = createAction('[Materials/API] Load Materials Success', props<{ materials: IMaterial[] }>());
export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());
