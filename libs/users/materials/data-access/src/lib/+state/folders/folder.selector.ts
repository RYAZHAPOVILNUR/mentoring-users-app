
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersState } from '../folders/folders.reducer';

export const selectFolderState = createFeatureSelector<FoldersState>('folders');

export const selectAllFolders = createSelector(
  selectFolderState,
  state => state.folders
);

export const selectFoldersLoading = createSelector(
  selectFolderState,
  state => state.loading
);

export const selectFoldersError = createSelector(
  selectFolderState,
  state => state.error
);
