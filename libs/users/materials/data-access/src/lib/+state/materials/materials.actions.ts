import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from '../../materials-dto/materials.entity';

export const loadMaterials = createAction('[Materials Page] Load Materials');

export const loadMaterialsSuccess = createAction(
  '[Materials/Api] Load Materials Success',
  props<{ materials: MaterialsEntity[] }>()
);

export const loadMaterialsFailure = createAction('[Materials/Api] Load Materials Failure', props<{ error: Error }>());
