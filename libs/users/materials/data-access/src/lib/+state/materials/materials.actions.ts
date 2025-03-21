import { createAction, props } from '@ngrx/store';
import { IMaterialsActionSuccess } from '../../models/materials/material-action-success.model';
import { LoadingStatus } from '@users/core/data-access';
import { TCreateMaterialDTO, TMaterialDTO } from '../../models/materials/material-dto.model';

export const loadMaterials = createAction('[Materials Page] Load Materials');

export const loadMaterialsSuccess = createAction(
  '[Materials Page] Load Materials Success',
  props<IMaterialsActionSuccess>()
);
export const loadMaterialsFailed = createAction(
  '[Materials Page] Load Materials Failed',
  props<{
    error: any;
  }>()
);

export const deleteMaterial = createAction(
  '[Materials Page] Delete Materials',
  props<{
    id: number;
  }>()
);

export const deleteMaterialSuccess = createAction('[Materials Page] Delete Materials Success', props<{ id: number }>());
export const deleteMaterialFailed = createAction(
  '[Materials Page] Delete Materials Failed',
  props<{
    error: any;
  }>()
);

export const addMaterial = createAction(
  '[Materials Page] Add Material',
  props<{
    material: TCreateMaterialDTO;
  }>()
);

export const addMaterialSuccess = createAction(
  '[Materials Page] Add Material Success',
  props<{
    material: TMaterialDTO;
  }>()
);
export const addMaterialFailed = createAction(
  '[Materials Page] Add Material Failed',
  props<{
    error: any;
  }>()
);

export const updateMaterialsStatus = createAction(
  '[Materials Page] Update Materials Status',
  props<{
    status: LoadingStatus;
  }>()
);
