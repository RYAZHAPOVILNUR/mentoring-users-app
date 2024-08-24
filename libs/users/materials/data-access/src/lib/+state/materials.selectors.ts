import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.materialsFeatureKey);

const { selectAll, selectEntities } = fromMaterials.materialsAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.status);

export const selectUsersError = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.error);

export const selectAllFolders = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => selectEntities(state));

export const selectSelectedId = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.selectedId);

export const selectEntity = createSelector(selectMaterialsEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectFolderById = (id: number) => createSelector(selectMaterialsEntities, (entities) => entities[id]);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectMaterialsEntities,
  ({ id }, entities) => entities[id] || null
);

