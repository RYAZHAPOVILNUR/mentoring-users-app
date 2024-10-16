import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  foldersAdapter, foldersFeature, FoldersState } from './folders.reducer';
import { FoldersVM } from '@users/materials/feature-folders-list';

const { selectAll } = foldersAdapter.getSelectors()


export const selectFolders = createSelector(
  foldersFeature.selectFoldersState,
  (state: FoldersState) => selectAll(state)
);
export const selectFoldersStatus = createSelector(
  foldersFeature.selectFoldersState,
  (state: FoldersState) => state.status
);
export const selectFoldersError = createSelector(
  foldersFeature.selectFoldersState,
  (state: FoldersState) => state.error
);
// export const selectFoldersDelete = createSelector(
//   foldersFeature.selectFoldersState,
//   (state: FoldersState) => state.folders
// )

// export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);
//
// const { selectAll } = foldersAdapter.getSelectors();
//
// export const selectFoldersStatus = createSelector(selectFoldersState, (state:FoldersState) => state.status);
//
// export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);
//
// export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));
