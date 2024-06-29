import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectAllFolders = createSelector(
  selectFoldersState,
  (state) => selectAll(state)
);

export const selectFoldersEntities = createSelector(
  selectFoldersState, ((state) => selectEntities(state))
);

export const selectFoldersStatus = createSelector(
  selectFoldersState, (state) => state.status
);

export const selectFoldersError = createSelector(
  selectFoldersState, (state) => state.error
);

export const selectOpenedFolder = createSelector(
  selectFoldersState, (state) => state.openedFolder
);
