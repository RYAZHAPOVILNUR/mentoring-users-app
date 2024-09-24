import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) => selectEntities(state));

export const selectOpenedFolder = createSelector(
    selectRouteParams,
    selectFoldersEntities,
    ({ id }, entities) => {
        console.log({id}, entities);
        return entities[id] || null;
    }
);