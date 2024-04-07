import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.MATERIALS_FEATURE_KEY);

export const selectMaterialsFolders = createSelector(
  selectMaterialsState,
  (state) => state.folders
)

export const selectMaterialsFoldersStatus = createSelector(
  selectMaterialsState,
  (state) => state.status
)
export const selectMaterialsFoldersError = createSelector(
  selectMaterialsState,
  (state) => state.error
)

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state) => state.materials
)

export const selectMaterialsStatus = createSelector(
  selectMaterialsState,
  (state) => state.status
)

export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state) => state.error
)

