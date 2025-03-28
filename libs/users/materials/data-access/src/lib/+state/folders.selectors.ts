import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersAdapter, FoldersState } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll } = FoldersAdapter.getSelectors();

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

