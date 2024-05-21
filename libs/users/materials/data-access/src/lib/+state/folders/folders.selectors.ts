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

//для работы с селекторами (все энтити)
export const selectFoldersEntities = createSelector(
  selectFoldersState,
  (state: FoldersState) => selectEntities(state)
);

//для работы с селекторами (все id энтити)
export const selectSelectedFolderId = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectFoldersEntities,
  selectSelectedFolderId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
