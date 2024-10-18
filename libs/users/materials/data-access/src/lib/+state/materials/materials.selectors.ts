import { createSelector } from '@ngrx/store';
import { materialsAdapter, materialsFeature, MaterialsState } from './materials.reducer';

const {selectAll} = materialsAdapter.getSelectors()

export const selectMaterials = createSelector(
  materialsFeature.selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);
export const selectMaterialStatus = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.status
);
export const selectMaterialError = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.error
);
