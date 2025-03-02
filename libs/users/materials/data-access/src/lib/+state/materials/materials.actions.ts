import { createAction, props } from '@ngrx/store';
import { MaterialsDTO } from '../../../../../../../core/data-access/src/lib/materials-dto.model';


export const initMaterials = createAction('[Material Page] Init');
export const loadMaterialsSuccess = createAction('[Materials/API] Load Materials Success', props<{ material: MaterialsDTO[] }>());
export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());
