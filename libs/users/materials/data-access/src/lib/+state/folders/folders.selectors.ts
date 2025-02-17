import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, foldersAdapter, FoldersState } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

export const selectFoldersStatus = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.status
);

export const selectFoldersError = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.error
);

export const selectAllFolders = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.folders
);

export const selectSelectedId = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.selectedId
);

export const selectFolderById = (id: number) => createSelector(
  selectFoldersState,
  (state: FoldersState) => state.folders.find(folder => folder.id === id)
);

export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) => selectEntities(state));

const { selectEntities } = foldersAdapter.getSelectors();

export const selectOpenedFolder = createSelector(
  selectFoldersState,
  (state: FoldersState) => {
    if (!state.selectedId) return null;
    return state.folders.find(folder => folder.id === state.selectedId);
  }
);