import { createAction, emptyProps, props } from '@ngrx/store';
import { CreateMaterialDTO, MaterialDTO } from '../../models/materials.models';
import { LoadingStatus } from '@users/core/data-access';

export const initMaterials = createAction('[Materials Page] Init Materials');

export const loadMaterialsSuccess = createAction('[Materials/API] Load Materials Success', props<{ materials: MaterialDTO[] }>());

export const loadMaterialsFailure = createAction('[Materials/API] Load Materials Failure', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Materials/Api] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailed = createAction('[Materials/Api] Delete Material Failed', props<{ error: any }>());

export const addMaterial = createAction('[Materials Page] Add Material', props<{ material: CreateMaterialDTO }>());
export const addMaterialSuccess = createAction('[Materials/Api] Add Material Success', props<{ material: MaterialDTO }>());
export const addMaterialFailed = createAction('[Materials/Api] Add Material Failed', props<{ error: any }>());

export const loadMaterial = createAction('[Materials Page] Load Material');
export const loadMaterialSuccess = createAction('[Materials/Api] Load Material Success', props<{ materialData: MaterialDTO }>());
export const loadMaterialFailed = createAction('[Materials/Api] Load Material Failed', props<{ error: any }>());

export const updateMaterialStatus = createAction('[Materials Detail] Update Material Status', props<{ status: LoadingStatus }>());


// export const editMaterial = createAction(
//   '[Materials Detail] Edit Material',
//   props<{
//     materialData: CreateMaterialDTO;
//     id: number;
//     onSuccessCb: onSuccessEditionCbType;
//   }>()
// );
// export const editMaterialSuccess = createAction('[Materials Detail] Edit Material Success', props<{ materialData: MaterialDTO }>());
// export const editMaterialFailed = createAction('[Materials Detail] Edit Failed', props<{ error: MaterialsErrors | null }>());
