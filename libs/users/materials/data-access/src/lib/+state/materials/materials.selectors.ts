import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, materialsAdapter, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.status
);

export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.error
);

export const selectAllMaterials = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);

export const selectMaterialsEntities = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectEntities(state)
);

export const selectMaterialSelectedId = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectMaterialsEntities,
  selectMaterialSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
