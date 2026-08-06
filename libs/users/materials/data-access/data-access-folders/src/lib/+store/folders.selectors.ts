import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParam } from '@shared/util-store';

import { FOLDERS_FEATURE_KEY, FoldersState } from './folders.reducer';

const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const selectCurrentFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectFolders = createSelector(selectFoldersState, (state: FoldersState) => state.folders);

export const selectFoldersLoadingStatus = createSelector(
  selectCurrentFoldersStatus,
  (status: string) => status === 'loading',
);

export const selectFolderTitle = createSelector(selectFolders, selectRouteParam('id'), (folders, id) => {
  const folder = Number(id) ? folders.find((folder) => folder.id === Number(id)) || null : null;
  return folder ? folder.title : '';
});
