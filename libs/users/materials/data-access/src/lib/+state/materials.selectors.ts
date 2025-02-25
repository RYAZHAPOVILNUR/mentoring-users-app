import { createFeatureSelector, createSelector } from '@ngrx/store';
import {foldersAdapter, MATERIALS_FEATURE_KEY} from './materials.reducer';
import { FoldersState } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<FoldersState>(MATERIALS_FEATURE_KEY);

const {selectAll, selectEntities} = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectMaterialsState, (state: FoldersState) => state.status);

export const selectFoldersError = createSelector(selectMaterialsState, (state: FoldersState) => state.error);

export const selectAllFolders = createSelector(selectMaterialsState, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectMaterialsState, (state: FoldersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectMaterialsState, (state: FoldersState) => state.selectedId);

export const selectEntity = createSelector(selectFoldersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectFolderById = (id: number) => createSelector(selectFoldersEntities, (entities) => entities[id]);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] || null
);