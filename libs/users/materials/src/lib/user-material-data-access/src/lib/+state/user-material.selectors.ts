import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { materialsAdapter, MaterialState, USER_MATERIALS_FEATURE_KEY } from './user-material.reducers';

export const selectUserMaterialsState = createFeatureSelector<MaterialState>(USER_MATERIALS_FEATURE_KEY);

const {selectAll, selectEntities} = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectUserMaterialsState, (state: MaterialState) => state.status);

export const selectMaterialsError = createSelector(selectUserMaterialsState, (state: MaterialState) => state.error);

export const selectAllMaterials = createSelector(selectUserMaterialsState, (state: MaterialState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectUserMaterialsState, (state: MaterialState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUserMaterialsState, (state: MaterialState) => state.selectedId);

export const selectEntity = createSelector(selectMaterialsEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectFolderById = (id: number) => createSelector(selectMaterialsEntities, (entities) => entities[id]);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectMaterialsEntities,
  ({id}, entities) => entities[id] || null
);