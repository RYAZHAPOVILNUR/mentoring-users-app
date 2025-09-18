import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MATERIALS_FEATURE_KEY, MaterialsState, selectAll } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);
export const selectAllMaterials = createSelector(selectMaterialsState, selectAll);
export const selectMaterialsStatus = createSelector(selectMaterialsState, (state) => state.status);
export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state) => state.error as HttpErrorResponse | null,
);
