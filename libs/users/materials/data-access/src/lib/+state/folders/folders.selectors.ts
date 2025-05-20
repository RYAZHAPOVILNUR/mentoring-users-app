import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FOLDERS_FEATURE_KEY, foldersAdapter, FoldersState } from "./folders.reducer";
import { selectRouteParams } from "@users/core/data-access";

export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.error);

export const selectFoldersEntities = createSelector(
  selectFoldersState, 
  (state: FoldersState) => selectEntities(state)
)

export const selectTitleFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] || null
)