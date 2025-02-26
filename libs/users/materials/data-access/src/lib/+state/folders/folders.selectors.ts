import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { selectUsersEntities } from '@users/users/data-access';

// Главный селектор состояния папок
export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.errors);

// Создаем селектор для списка папок
export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectFoldersState, (state: FoldersState) => selectEntities(state));

export const selectFoldersFilter = createSelector(selectFoldersState, (state: FoldersState) => state.foldersFilter);

export const selectFiltredFolders = createSelector(selectAllFolders, selectFoldersFilter, (folders, filter) => {
  return folders.filter((folder) => folder.title.toLowerCase().includes(filter.title.toLowerCase()));
});

export const selectFolderById = (id: number) => createSelector(selectFoldersEntities, (entities) => entities[id]);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null
);
