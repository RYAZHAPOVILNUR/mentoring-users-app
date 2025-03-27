import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersAdapter, FoldersState } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll } = FoldersAdapter.getSelectors();


export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

