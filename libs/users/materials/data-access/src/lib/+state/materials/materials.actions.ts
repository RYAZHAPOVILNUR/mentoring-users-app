import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from '../../models/materials.entity';


export const initMaterials = createAction('[Materials Page] Init');
export const loadMaterialsSuccess = createAction(
  '[Materials/API] Load Materials Success', props<{ materials: MaterialsEntity[] }>());
export const loadMaterialsFailure = createAction(
  '[Materials/API] Load Materials Failure', props<{ error: any }>());
