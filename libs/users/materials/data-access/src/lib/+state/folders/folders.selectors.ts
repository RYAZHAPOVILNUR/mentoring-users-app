import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FOLDERS_FEATURE_KEY, materialsFoldersAdapter, IMaterialsFoldersState } from './folders.reducer';

export const selectMaterialsFoldersState = createFeatureSelector<IMaterialsFoldersState>(MATERIALS_FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsFoldersAdapter.getSelectors();

export const selectMaterialsFoldersStatus = createSelector(
  selectMaterialsFoldersState,
  (state: IMaterialsFoldersState) => state.status
);

export const selectMaterialFoldersError = createSelector(
  selectMaterialsFoldersState,
  (state: IMaterialsFoldersState) => state.error
);

export const selectAllFolders = createSelector(selectMaterialsFoldersState, (state: IMaterialsFoldersState) =>
  selectAll(state)
);
