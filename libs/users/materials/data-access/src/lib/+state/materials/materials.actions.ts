import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from '../../materials-dto/materials.entity';
import { LoadingStatus } from '@users/core/data-access';

export const initMaterials = createAction('[Materials Page] Init');

export const loadMaterialsSuccess = createAction(
  '[Materials/Api] Load Materials Success',
  props<{ materials: MaterialsEntity[] }>()
);

export const loadMaterialsFailure = createAction('[Materials/Api] Load Materials Failure', props<{ error: Error }>());

export const updateMaterialState = createAction(
  '[Materials Detail] Update Material Status',
  props<{ status: LoadingStatus }>()
);

export const loadMaterials = createAction('[Materials Page] Load Materials');

export const loadMaterialSuccess = createAction(
  '[Material/Api] Load Material Success',
  props<{ materialData: MaterialsEntity }>()
);

export const loadMaterialFailed = createAction('[Material/Api] Load Material Failed', props<{ error: any }>());
