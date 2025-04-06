import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from '../../materials-dto/materials.entity';
import { LoadingStatus } from '@users/core/data-access';

export const loadMaterials = createAction('[Materials Page] Load Materials');

export const loadMaterialsSuccess = createAction(
  '[Materials/Api] Load Materials Success',
  props<{ materials: MaterialsEntity[] }>()
);

export const loadMaterialsFailure = createAction('[Materials/Api] Load Materials Failure', props<{ error: Error }>());

export const updateMaterialsStatus = createAction(
  '[Materials Page] Load materials Status',
  props<{ status: LoadingStatus }>()
);

export const addMaterial = createAction('[Materials Page] Add Material', props<{ materialData: MaterialsEntity }>());
export const addMaterialSuccess = createAction(
  '[Materials Page] Add Material Success',
  props<{ materialData: MaterialsEntity }>()
);
export const addMaterialFailed = createAction('[Materials Page] Add Material Failed', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials Page] Delete Materil', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials Page] Delete Materials Success', props<{ id: number }>());
export const deleteMaterialFailed = createAction('[Materials Page] delete Material Failed', props<{ error: any }>());
