import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { foldersAdapter, MaterialsFeatureState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsFeatureState>(
  fromMaterials.MATERIALS_FEATURE_KEY
);

export const selectFoldersState = createSelector(selectMaterialsState, (state: MaterialsFeatureState) => state.folders);
export const selectLoadingStatus = createSelector(selectMaterialsState, (state: MaterialsFeatureState) => state.status);
export const selectAllFolders = createSelector(selectFoldersState, foldersAdapter.getSelectors().selectAll);
