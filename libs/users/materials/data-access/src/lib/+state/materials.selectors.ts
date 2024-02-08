import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { MaterialState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialState>(
  fromMaterials.materialsFeatureKey
);
export const selectFolders = createSelector(
  selectMaterialsState,
  (state: MaterialState) => state.folders
);

export const selectIsLoading = createSelector(
  selectMaterialsState,
  (state: MaterialState) => state.isLoading
);

