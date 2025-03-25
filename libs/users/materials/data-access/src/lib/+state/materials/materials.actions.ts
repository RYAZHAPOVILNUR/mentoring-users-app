import { createAction, props } from '@ngrx/store';
import { CreateMaterialDTO, MaterialsDTO } from '@users/core/data-access';

export const initMaterials = createAction('[Material Page] Init');
export const loadMaterialsSuccess = createAction('[Materials/API] Load Materials Success', props<{ material: MaterialsDTO[] }>());
export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());

export const addMaterial = createAction('[Materials/API] Add Material', props<{ material: CreateMaterialDTO }>());
export const addMaterialSuccess = createAction('[Materials/API] Add MaterialSuccess', props<{ material: MaterialsDTO }>());
export const addMaterialFailure = createAction('[Materials/API] Add MaterialFailure', props<{ error: any }>());

export const deleteMaterial = createAction('[Material/API] Delete Material', props<{ material: MaterialsDTO }>());
export const deleteMaterialSuccess = createAction('[Material/API] Delete MaterialSuccess', props<{ materialId: number }>());
export const deleteMaterialFailure = createAction('[Materials/API] Delete MaterialFailure', props<{ error: any }>());

