import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { foldersAdapter, materialsAdapter, MaterialsFeatureState } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsFeatureState>(
  fromMaterials.MATERIALS_FEATURE_KEY
);

export const selectFoldersState = createSelector(selectMaterialsState, (state: MaterialsFeatureState) => state.folders);
export const selectLoadingStatus = createSelector(selectMaterialsState, (state: MaterialsFeatureState) => state.status);
export const selectAllFolders = createSelector(selectFoldersState, foldersAdapter.getSelectors().selectAll);

export const selectCurrentFolder = createSelector(
  selectMaterialsState,
  (state: MaterialsFeatureState) => state.currentFolder
);

export const selectMaterials = createSelector(selectMaterialsState, (state: MaterialsFeatureState) => state.materials);
export const selectAllMaterials = createSelector(selectMaterials, materialsAdapter.getSelectors().selectAll);

export const selectCurrentFolderMaterials = createSelector(selectAllMaterials, selectRouteParams, (state, params) =>
  state.filter((material) => material.folder_id === +params['id'])
);
