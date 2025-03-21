import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FOLDERS_FEATURE_KEY, materialsFoldersAdapter, IMaterialsFoldersState } from './folders.reducer';
import { selectRouteParams } from '@users/core/data-access';

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

export const selectFoldersEnteties = createSelector(selectMaterialsFoldersState, (state: IMaterialsFoldersState) =>
  selectEntities(state)
);

export const selectAllFolders = createSelector(selectMaterialsFoldersState, (state: IMaterialsFoldersState) =>
  selectAll(state)
);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEnteties,
  ({ id }, entities) => entities[id] || null
);
