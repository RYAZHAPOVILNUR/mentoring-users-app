import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FOLDERS_FEATURE_KEY,
  FoldersState,
  foldersAdapter,
} from './folders.reducer';

// Lookup the 'Materials' feature state managed by NgRx
export const selectFoldersState =
  createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);
const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.status
);

export const selectFolderErrors = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.error
);

export const selectFolders = createSelector(
  selectFoldersState,
  (state: FoldersState) => selectAll(state)
);

export const selectFoldersEntities = createSelector(
  selectFoldersState,
  (state: FoldersState) => selectEntities(state)
);

export const selectSelectedFolderId = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.selectedId
);

export const selectActiveFolder = createSelector(
  selectFoldersState,
  (state => state.activeFolder)
)

export const selectEntity = createSelector(
  selectFoldersEntities,
  selectSelectedFolderId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
