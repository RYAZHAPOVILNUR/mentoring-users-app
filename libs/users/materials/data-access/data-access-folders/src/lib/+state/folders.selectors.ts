import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from '@shared/util-store';

import { FOLDER_FEATURE_KEY, foldersAdapter, FoldersState, foldersFeature } from './folders.reducer';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDER_FEATURE_KEY);

export const { selectStatus } = foldersFeature;

export const { selectAll: selectAllFolders, selectEntities: selectFoldersEntities } =
  foldersAdapter.getSelectors(selectFoldersState);

export const selectOpenedMaterials = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null,
);
