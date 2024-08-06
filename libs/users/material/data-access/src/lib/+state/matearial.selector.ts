import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIAL_FEATURE_KEY, materialAdapter, MaterialState } from './matearial.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialState>(MATERIAL_FEATURE_KEY);

const { selectAll, selectEntities } = materialAdapter.getSelectors();

export const selectMaterialStatus = createSelector(selectMaterialsState, (state: MaterialState) => state.status);

export const selectMaterialError = createSelector(selectMaterialsState, (state: MaterialState) => state.error);

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectMaterialsState, (state: MaterialState) =>
  selectEntities(state)
);

export const selectOpenedMaterials = createSelector(selectMaterialsState, (state: MaterialState) => state.material);
