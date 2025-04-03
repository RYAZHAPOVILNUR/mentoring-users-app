import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';
import { selectRouteParam } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

export const selectMaterialIdFromRoute = createSelector(selectRouteParam('id'), (id) => (id ? Number(id) : null));

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.errors);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectFilteredMaterials = createSelector(
  selectAllMaterials,
  selectMaterialIdFromRoute,
  (materials, materialId) => {
    return materials.filter((material) => material.folderId === materialId);
  }
);
