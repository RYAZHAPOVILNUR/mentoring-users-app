import { foldersAdapter, FoldersFeatureKey, FoldersState } from './folders.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const selectFoldersState = createFeatureSelector<FoldersState>(FoldersFeatureKey);

const { selectAll } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));
