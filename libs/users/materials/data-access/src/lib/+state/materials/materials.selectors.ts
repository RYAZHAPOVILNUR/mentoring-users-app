import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectmaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.errors);

export const selectAllMaterials = createSelector(selectMaterialsState, (state) =>
  state ? materialsAdapter.getSelectors().selectAll(state) : []
);

export const selectMaterialsFilter = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.materialsFilter
);

export const selectFiltredMaterials = createSelector(selectAllMaterials, selectMaterialsFilter, (materials, filter) => {
  return materials.filter((material) => material.title.toLowerCase().includes(filter.title.toLowerCase()));
});

export function selectMaterialsById(id: number): any {
  throw new Error('Function not implemented.');
}
