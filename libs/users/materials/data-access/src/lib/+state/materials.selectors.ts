import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { materialsAdapter, MaterialsState } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(
  fromMaterials.materialsFeatureKey
);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] ?? null
);

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => state.materials);

export const selectFolderMaterials = createSelector(
  selectMaterialsState,
  selectOpenedFolder,
  (state: MaterialsState, folder) => state.materials.filter((material) => material.folder_id === folder?.id)
);
