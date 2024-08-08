import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, foldersAdapter, materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

const selectFeatureState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll: selectAllF } = foldersAdapter.getSelectors();
const { selectAll: selectAllM } = materialsAdapter.getSelectors();

export const selectFoldersState = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.folders
);

export const selectMaterialsSubState = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.materials
);

export const selectAllFolders = createSelector(
  selectFoldersState,
  selectAllF
);

export const selectFoldersStatus = createSelector(selectFeatureState, (state: MaterialsState) => state.folders.status)

export const selectFoldersError = createSelector(selectFeatureState, (state: MaterialsState) => state.folders.error)

export const selectAllMaterials = createSelector(
  selectMaterialsSubState,
  selectAllM
);

export const filteredMaterials = createSelector(selectAllMaterials, selectRouteParams, (materials, { id }) => materials.filter(material => material.folder_id === Number(id)))

export const selectMaterialsStatus = createSelector(selectFeatureState, (state: MaterialsState) => state.materials.status)

export const selectMaterialsErrors = createSelector(selectFeatureState, (state: MaterialsState) => state.materials.error)