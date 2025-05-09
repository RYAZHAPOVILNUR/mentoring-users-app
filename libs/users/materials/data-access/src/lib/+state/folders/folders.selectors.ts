import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FOLDERS_FEATURE_KEY, foldersAdapter, FoldersState } from "./folders.reducer";

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);