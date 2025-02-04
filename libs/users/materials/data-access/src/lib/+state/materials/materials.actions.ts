import { createAction, props } from '@ngrx/store';
import { IMaterialsActionSuccess } from '../../models/materials/material-action-success.model';
import { LoadingStatus } from '@users/core/data-access';

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

export const deleteMaterials = createAction(
  '[Materials Page] Delete Materials',
  props<{
    id: number;
  }>()
);

export const deleteMaterialsSuccess = createAction(
  '[Materials Page] Delete Materials Success',
  props<{ id: number }>()
);
export const deleteMaterialsFailed = createAction(
  '[Materials Page] Delete Materials Failed',
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
