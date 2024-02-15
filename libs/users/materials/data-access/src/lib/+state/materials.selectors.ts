import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { MaterialState } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialState>(
  fromMaterials.materialsFeatureKey
);
export const selectFolders = createSelector(
  selectMaterialsState,
  (state: MaterialState) => state.folders
);

export const selectIsLoadingFolders = createSelector(
  selectMaterialsState,
  (state: MaterialState) => state.isLoadingFolders
);

export const selectIsLoadingMaterials = createSelector(
  selectMaterialsState,
  (state: MaterialState) => state.isLoadingMaterials
);

export const selectMaterialsByFolderId = createSelector(
  selectRouteParams,
  selectMaterialsState,
  ({ id }, state: MaterialState) => state.materials.filter(({ folder_id }) =>
    folder_id.toString() === id)
);

