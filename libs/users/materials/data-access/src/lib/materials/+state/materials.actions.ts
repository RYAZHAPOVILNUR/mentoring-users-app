import { createAction, props } from '@ngrx/store';
import { CreateMaterialDTO, MaterialsEntity } from '../../models/materials.interface';

export const loadMaterials = createAction('[Materials Page] Materials Init');
export const loadMaterialsSuccess = createAction(
  '[Materials/API] Load Materials Success',
  props<{ materials: MaterialsEntity[] }>()
);
export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials Page] Add Material', props<{ materialData: CreateMaterialDTO }>());
export const addMaterialSuccess = createAction(
  '[Materials/API] Add Material Success',
  props<{ materialData: MaterialsEntity }>()
);
export const addMaterialFailed = createAction('[Materials/API] Add Material Failed', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials/API] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailed = createAction('[Materials/API] Delete Material Failed', props<{ error: any }>());
