import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MATERIALS_FEATURE_KEY,
  foldersAdapter,
  MaterialsFeatureState, materialsAdapter
} from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { Material } from '../models/material.model';
import { Params } from '@angular/router';

export const selectMaterialsState = createFeatureSelector<MaterialsFeatureState>(
  MATERIALS_FEATURE_KEY
);

export const selectFoldersStateInside = createSelector(
  selectMaterialsState,
  (state: MaterialsFeatureState) => state.folders
)
export const selectAllFolders = createSelector(
  selectFoldersStateInside,
  foldersAdapter.getSelectors().selectAll
);
export const selectCurrentFolder = createSelector(
  selectMaterialsState,
  (state: MaterialsFeatureState) => state.selectedFolder
)
export const selectLoadingStatus = createSelector(
  selectMaterialsState,
  (state: MaterialsFeatureState) => state.status
);

export const selectMaterialsStateInside = createSelector(
  selectMaterialsState,
  (state: MaterialsFeatureState) => state.materials
);
export const selectAllMaterials = createSelector(
  selectMaterialsStateInside,
  materialsAdapter.getSelectors().selectAll
);
export const selectMaterialsForCurrentFolder = createSelector(
  selectAllMaterials,
  selectRouteParams,
  (state: Material[], params: Params) => {
    return state.filter((material: Material) => material.folder_id === +params['id'])
  }
);
