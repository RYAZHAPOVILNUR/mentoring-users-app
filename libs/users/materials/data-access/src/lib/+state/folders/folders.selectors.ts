import { createFeatureSelector, createSelector } from '@ngrx/store';
import { foldersAdapter } from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';
import * as fromFolders from './folders.reducer';

export const selectFoldersState = createFeatureSelector<fromFolders.FoldersState>(fromFolders .FOLDERS_FEATURE_KEY);

const {selectAll, selectEntities} = foldersAdapter.getSelectors();

export const selectAllFolders = createSelector(
  selectFoldersState, state => selectAll(state)
);

export const selectFoldersStatus = createSelector(
  selectFoldersState, state => state.status
);

export const selectFoldersEntities = createSelector(
  selectFoldersState, state => selectEntities(state)
);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] ?? null
);
