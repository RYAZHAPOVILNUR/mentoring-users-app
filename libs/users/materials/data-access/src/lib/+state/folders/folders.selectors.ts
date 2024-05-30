import { FOLDERS_FEATURE_KEY, foldersAdapter } from './folders.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FolderState } from '../../interfaces/folder-state.interface';

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersState = createFeatureSelector<FolderState>(
  FOLDERS_FEATURE_KEY
);
export const selectFolders = createSelector(
  selectFoldersState,
  (state) => selectAll(state)
);
export const selectFoldersStatus = createSelector(
  selectFoldersState, (state) => state.status
);

export const selectFoldersEntities = createSelector(
  selectFoldersState,
  (state) => selectEntities(state)
);

