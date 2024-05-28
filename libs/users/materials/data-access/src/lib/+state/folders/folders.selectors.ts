import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';
const { selectAll, selectEntities } = foldersAdapter.getSelectors();
export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));
export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);
export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);
export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) => selectEntities(state));
