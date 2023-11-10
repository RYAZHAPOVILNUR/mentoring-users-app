import {  createSelector } from '@ngrx/store';

import { FolderState, foldersAdapter, foldersFeature } from './materials.reducer';
import { selectQueryParams } from '@users/core/data-access';

export const { selectFoldersState, selectIds, selectStatus } = foldersFeature

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFolders = createSelector(
  selectFoldersState,
  (state: FolderState) => selectAll(state)
)
export const selectFoldersEntities = createSelector(
  selectFoldersState,
  (state: FolderState) => selectEntities(state)
);
export const selectFoldersForEdit = createSelector(
  selectQueryParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null
)