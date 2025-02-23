import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from '../../materials-dto/materials.entity';

export const initMaterials = createAction('[Materials Page] Init');

export const loadMaterialsSuccess = createAction(
  '[Materials/Api] Load Materials Success',
  props<{ materials: MaterialsEntity[] }>()
);

export const loadMaterialsFailure = createAction('[Materials/Api] Load Materials Failure', props<{ error: Error }>());
