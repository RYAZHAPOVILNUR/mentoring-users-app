import { createSelector } from '@ngrx/store';
import { foldersAdapter, foldersFeature, FoldersState } from './folders.reducer';

const { selectAll } = foldersAdapter.getSelectors();

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
