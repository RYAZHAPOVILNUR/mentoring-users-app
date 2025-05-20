import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, 
  (state: MaterialsState) => state.status
);

export const selectAllMaterials = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);

export const selectMaterialsError = createSelector(
  selectMaterialsState, 
  (state: MaterialsState) => state.error
);

export const selectMaterialSelectedId = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.selectedId
);