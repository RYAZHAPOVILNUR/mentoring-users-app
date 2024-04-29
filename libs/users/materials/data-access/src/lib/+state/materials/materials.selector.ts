import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIAL_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';

const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIAL_FEATURE_KEY);

const { selectAll } = materialsAdapter.getSelectors();

export const selectAllMaterial = createSelector(selectMaterialsState, (state) => selectAll(state));
export const selectMaterialsStatus = createSelector(selectMaterialsState, (state) => state.status);
export const selectMaterialsError = createSelector(selectMaterialsState, (state) => state.error);
