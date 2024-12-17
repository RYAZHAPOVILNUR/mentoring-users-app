import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, materialsAdapter, MaterialsState } from './materials.reducer';

export const materialsStateSelector = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll } = materialsAdapter.getSelectors();

export const selectAllMaterials = createSelector(materialsStateSelector, (state: MaterialsState) => selectAll(state));
export const selectMaterialsStatus = createSelector(materialsStateSelector, (state: MaterialsState) => state.status);
