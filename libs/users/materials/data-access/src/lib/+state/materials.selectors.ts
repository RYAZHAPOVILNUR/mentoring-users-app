import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<State>('materials');

export const selectFolders = createSelector(
  selectMaterialsState,
  (state: State) => state.folders
);

export const selectFoldersStatus = createSelector(
  selectMaterialsState,
  (state: State) => state.status
);

export const selectFoldersError = createSelector(
  selectMaterialsState,
  (state: State) => state.error
);

export const selectSelectedFolder = createSelector(
  selectMaterialsState,
  (state: State) => state.selectedFolder
);

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state: State) => state.materials
);

export const selectMaterialsStatus = createSelector(
  selectMaterialsState,
  (state: State) => state.status
);
