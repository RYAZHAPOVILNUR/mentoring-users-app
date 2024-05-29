import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { materialsAdapter } from './materials.reducer';

export const MATERIALS_FEATURE_KEY = 'materials';

export const selectMaterialsState = createFeatureSelector<fromMaterials.IMatreialsState>(MATERIALS_FEATURE_KEY);
export const selectMaterialsAll = createSelector(selectMaterialsState, materialsAdapter.getSelectors().selectAll);
export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: fromMaterials.IMatreialsState) => state.status);
export const selectMaterialsError = createSelector(selectMaterialsState, (state: fromMaterials.IMatreialsState) => state.error);
