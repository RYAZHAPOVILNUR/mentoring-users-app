import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FOLDERS_FEATURE_KEY, FoldersState, selectAll, selectEntities } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);
export const selectAllFolders = createSelector(selectFoldersState, selectAll);
export const selectFoldersEntities = createSelector(selectFoldersState, selectEntities);
export const selectFoldersStatus = createSelector(selectFoldersState, (state) => state.status);
export const selectFoldersError = createSelector(
  selectFoldersState,
  (state) => state.error as HttpErrorResponse | null,
);
export const selectSelectedFolderId = createSelector(selectFoldersState, (state) => state.selectedId);
export const selectOpenedFolder = createSelector(
  selectFoldersEntities,
  selectSelectedFolderId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null),
);
