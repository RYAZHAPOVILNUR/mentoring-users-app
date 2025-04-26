import { createSelector } from '@ngrx/store';
import { FoldersState, foldersAdapter, foldersFeature } from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const { selectFoldersState, selectIds: selectFoldersIds, selectStatus: selectFolderStatus } = foldersFeature;

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) => selectEntities(state));

export const selectFolderSelectedId = createSelector(selectFoldersState, (state: FoldersState) => state.selectedId);

export const selectFolderEntity = createSelector(
  selectFoldersEntities,
  selectFolderSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectFolderById = (id: number) => createSelector(selectFoldersEntities, (entities) => entities[id]);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null
);
