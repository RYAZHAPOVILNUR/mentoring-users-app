import { props, createAction } from '@ngrx/store';
import { AddMaterialsType } from '../models/material.type';
import { MaterialsType } from "libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager";

export const initMaterials = createAction('[Materials Page] Init');
export const loadMaterialsSuccess = createAction('[Materials/API] Load Materials Success', props<{ materials: MaterialsType[] }>());
export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());

export const deleteMaterials = createAction('[Materials Page] Delete', props<{ id: number }>());
export const deleteMaterialsSuccess = createAction('[Materials/API] Delete Materials Success', props<{ id: number }>());
export const deleteMaterialsFailure = createAction('[Materials/API] Delete Materials Failure', props<{ error: any }>());

export const addMaterials = createAction('[Materials Page] Add Materials', props<{ materialData: AddMaterialsType }>());
export const addMaterialsSuccess = createAction('[Materials/Api] Add Materials Success', props<{ material: MaterialsType }>());
export const addMaterialsFailed = createAction('[Materials/Api] Add Materials Failed', props<{ error: any }>());