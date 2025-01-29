import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, materialsAdapter, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectFoldersStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectFoldersErrors = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);
