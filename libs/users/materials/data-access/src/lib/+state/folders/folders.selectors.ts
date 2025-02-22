import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersState } from './folders.reducer';
import { FOLDERS_FEATURE_KEY } from './folders.reducer';
import { selectAll, selectEntities, selectIds, selectTotal } from './folders.reducer';

// Feature Selector
export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

// Select All Folders
export const selectAllFolders = createSelector(selectFoldersState, selectAll);

// Select Folder Entities
export const selectFolderEntities = createSelector(selectFoldersState, selectEntities);

// Select Folder Ids
export const selectFolderIds = createSelector(selectFoldersState, selectIds);

// Select Total Folders
export const selectTotalFolders = createSelector(selectFoldersState, selectTotal);

// Select Folder by Id
export const selectFolderById = (folderId: string) =>
  createSelector(selectFoldersState, (state: FoldersState) => state.entities[folderId]);
