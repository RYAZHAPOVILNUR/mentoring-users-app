import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFolders from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { FoldersState, foldersAdapter } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<fromFolders.FoldersState>(fromFolders.FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) => selectEntities(state));

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null
);
