import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';

// Lookup the 'Folders' feature state managed by NgRx
export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(
  selectFoldersState, (state: FoldersState) => state.status);

export const selectFoldersError = createSelector(
  selectFoldersState, (state: FoldersState) => state.error);

export const selectAllFolders = createSelector(
  selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(
  selectFoldersState, (state: FoldersState) => selectEntities(state));

export const selectSelectedId = createSelector(
  selectFoldersState, (state: FoldersState) => state.selectedId);

export const selectEntity = createSelector(
  selectFoldersEntities, selectSelectedId,
  (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined);

export const selectOpenedFolder = createSelector(
  selectFoldersEntities,
  selectRouteParams,
  (entities, { folderId }) => {
    const id = Number(folderId);
    return id ? entities[id] : null;
  }
);
