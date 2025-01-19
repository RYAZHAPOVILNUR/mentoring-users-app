import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from './materials.models';
import { CreateMaterialDTO } from '../models/materials-dto.models';

export const initMaterials = createAction('[Materials Page] Init');

export const loadMaterialsSuccess = createAction(
  '[Materials/API] Load Materials Success',
  props<{ materials: MaterialsEntity[] }>()
);

export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials/API] Add Material', props<{ material: MaterialsEntity }>());
export const addMaterialSuccess = createAction(
  '[Materials/API] Add Material Success',
  props<{
    material: MaterialsEntity;
  }>()
);
export const addMaterialFailure = createAction('[Materials/API] Add Material Failure', props<{ error: string }>());
export const deleteMaterial = createAction('[Materials/API] Delete Folder]', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials/API] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction(
  '[Materials/API] Delete Material Failure]',
  props<{
    error: string;
  }>()
);
