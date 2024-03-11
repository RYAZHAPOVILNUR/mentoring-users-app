import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { MaterialsFeatureState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsFeatureState>(
  fromMaterials.MATERIALS_FEATURE_KEY
);

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsFeatureState) => state.folders);
