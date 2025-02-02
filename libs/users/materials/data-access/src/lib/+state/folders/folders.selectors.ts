import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FOLDERS_FEATURE_KEY, materialsFoldersAdapter, MaterialsFoldersState } from './folders.reducer';

export const selectMaterialsFoldersState = createFeatureSelector<MaterialsFoldersState>(MATERIALS_FOLDERS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsFoldersAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(
  selectMaterialsFoldersState,
  (state: MaterialsFoldersState) => state.status
);

export const selectMaterialError = createSelector(
  selectMaterialsFoldersState,
  (state: MaterialsFoldersState) => state.error
);

export const selectAllFolders = createSelector(selectMaterialsFoldersState, (state: MaterialsFoldersState) =>
  selectAll(state)
);
