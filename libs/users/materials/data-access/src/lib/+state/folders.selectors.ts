import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { FOLDERS_FEATURE_KEY, foldersAdapter, FoldersState } from './folders.reducer';

export const foldersStateSelector = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(foldersStateSelector, (state: FoldersState) => state.status);

export const selectAllFolders = createSelector(foldersStateSelector, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(foldersStateSelector, (state: FoldersState) =>
  selectEntities(state)
);

export const selectOpenedFolder = createSelector(
  selectFoldersEntities,
  selectRouteParams,
  (entities, { id }) => entities[id] || null
);
