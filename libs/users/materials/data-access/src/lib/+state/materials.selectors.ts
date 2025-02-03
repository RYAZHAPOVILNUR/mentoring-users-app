import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { MATERIALS_FEATURE_KEY, materialsAdapter, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectFoldersStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectFoldersErrors = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => state.materials);

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsErrors = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectSelectedFolderId = createSelector(selectMaterialsState, (state: MaterialsState) => state.selectedId);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectMaterialsEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectMaterialsByFolder = createSelector(
  selectAllMaterials,
  selectOpenedFolder,
  (materials, openedFolder) => {
    if (!openedFolder) return [];
    return materials.filter((material) => material.folder_id === openedFolder.id);
  }
);
