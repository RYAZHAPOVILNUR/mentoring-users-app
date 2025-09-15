import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@shared/util-store';

import { FOLDER_FEATURE_KEY, foldersAdapter, FolderState, folderFeature } from './folder.reducer';

export const selectFoldersState = createFeatureSelector<FolderState>(FOLDER_FEATURE_KEY);

export const { selectStatus: status } = folderFeature;

export const { selectAll: selectAllFolders, selectEntities: selectFoldersEntities } =
  foldersAdapter.getSelectors(selectFoldersState);

export const selectCurrentFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null,
);
