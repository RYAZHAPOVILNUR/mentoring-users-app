import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersAdapter } from './folders.reducer';

// Главный селектор состояния папок
export const selectFoldersState = createFeatureSelector<FoldersState>(FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectFoldersState, (state: FoldersState) => state.status);

export const selectFoldersError = createSelector(selectFoldersState, (state: FoldersState) => state.errors);
//
// export const selectAllFolders = createSelector(selectFoldersState, (state: FoldersState) => selectAll(state));

// Создаем селектор для списка папок
export const selectAllFolders = createSelector(
  selectFoldersState,
  (state) => (state ? foldersAdapter.getSelectors().selectAll(state) : []) // ✅ Проверяем state
);

export const selectFoldersFilter = createSelector(selectFoldersState, (state: FoldersState) => state.foldersFilter);

export const selectFiltredFolders = createSelector(selectAllFolders, selectFoldersFilter, (folders, filter) => {
  return folders.filter((folder) => folder.title.toLowerCase().includes(filter.title.toLowerCase()));
});
export function selectFolderById(id: number): any {
  throw new Error('Function not implemented.');
}
