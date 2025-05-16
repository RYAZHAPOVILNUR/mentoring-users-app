import { createSelector } from '@ngrx/store';
import {
  MaterialsState,
  materialsAdapter,
  materialsFeature,
} from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const { selectMaterialsState, selectIds, selectStatus } =
  materialsFeature;

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectAllFolders = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);

export const selectFoldersEntities = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectEntities(state)
);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, folders) => folders[id] || null
);