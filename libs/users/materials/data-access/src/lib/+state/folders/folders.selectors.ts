import { createFeatureSelector, createSelector } from '@ngrx/store';
import { foldersAdapter } from './folders.reducer';
import * as fromFolders from './folders.reducer';

export const FOLDERS_FEATURE_KEY = 'folders';

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersState = createFeatureSelector<fromFolders.IFoldersState>(FOLDERS_FEATURE_KEY);
export const selectAllFolders = createSelector(selectFoldersState, (state: fromFolders.IFoldersState) => selectAll(state));
export const selectEntityFolders = createSelector(selectFoldersState, (state: fromFolders.IFoldersState) => selectEntities(state));
export const selectFoldersStatus = createSelector(selectFoldersState, (state: fromFolders.IFoldersState) => state.status);
export const selectFoldersError = createSelector(selectFoldersState, (state: fromFolders.IFoldersState) => state.error);

