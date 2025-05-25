import { createAction, props } from '@ngrx/store';
import { MaterialsEntity } from '../../models-material/materials.entity';
import { CreateMaterialDTO } from '../../models-material/material-dto.model';
import { MaterialsErrors } from './materials.reducer';

export const initMaterials = createAction('[Materials Page] Init');
export const loadMaterialsSuccess = createAction('[Materials /API] Load Materials Success', props<{ materials: MaterialsEntity[] }>()); 
export const loadMaterialsFailure = createAction('[Materials /API] Load Materials Failure', props<{ error: MaterialsErrors }>()); 

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials /API] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction('[Materials /API] Delete Material Failure', props<{ error: MaterialsErrors }>());

export const addMaterial = createAction('[Materials Page] Add Material', props<{ materialData: CreateMaterialDTO }>());
export const addMaterialSuccess = createAction('[Materials /API] Add Material Success', props<{ materialData: MaterialsEntity}>());
export const addMaterialFailure = createAction('[Materials /API] Add Material Failure', props<{ error: MaterialsErrors }>());

