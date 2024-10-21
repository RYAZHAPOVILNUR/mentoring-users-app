import { createSelector } from '@ngrx/store';
import { foldersAdapter, foldersFeature, FoldersState } from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

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
export const selectFoldersEntities = createSelector(
  foldersFeature.selectFoldersState,
  (state: FoldersState) => selectEntities(state)
)
export const selectOpenFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] || null,
)
