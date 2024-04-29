import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';

const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll } = foldersAdapter.getSelectors();

export const selectAllFolders = createSelector(selectFoldersState, (state) => selectAll(state));
export const selectFoldersStatus = createSelector(selectFoldersState, (state) => state.status);
export const selectFoldersError = createSelector(selectFoldersState, (state) => state.error);
