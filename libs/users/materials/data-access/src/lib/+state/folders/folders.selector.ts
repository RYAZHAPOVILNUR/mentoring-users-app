import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersState, foldersAdapter, FOLDERS_FEATURE_KEY, } from './folders.reducer';
import { LoadingStatus } from '@users/core/data-access';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY); // Название фичи 'folders' укажи, если оно отличается

const { selectAll, selectEntities } = foldersAdapter.getSelectors();


export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));


export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) =>
  selectEntities(state)
);

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectFoldersErrors = createSelector(selectFoldersState, (state: FoldersState) => state.error);

export const selectSelectedFolderId = createSelector(selectFoldersState, (state: FoldersState) => state.selectedId);
