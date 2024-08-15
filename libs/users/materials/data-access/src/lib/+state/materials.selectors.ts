import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.status
)

export const selectAllFolders = createSelector(
  selectMaterialsState, (state: MaterialsState) => selectAll(state)
)