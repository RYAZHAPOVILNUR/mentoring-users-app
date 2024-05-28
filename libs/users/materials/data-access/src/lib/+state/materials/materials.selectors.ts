import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
const { selectAll } = fromMaterials.materialsAdapter.getSelectors();
export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(
  fromMaterials.MATERIALS_FEATURE_KEY
);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) =>
  selectAll(state)
);
export const selectMaterialsStatus = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => state.status
);
export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => state.error
);
