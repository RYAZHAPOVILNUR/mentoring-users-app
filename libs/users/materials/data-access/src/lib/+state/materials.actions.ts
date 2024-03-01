import { IMaterial } from './../model/material-models';
import { createAction, props } from '@ngrx/store';

export const initMaterials = createAction('[Material Page] Init')

export const loadMaterials = createAction('[Material Page] Load Materials')

export const loadMaterialsSuccess = createAction('[Material Page] Load Materials Success', props<{materials:IMaterial[]}>())

export const loadMaterialsFailed = createAction('[Material Page] Load Materials Failed')