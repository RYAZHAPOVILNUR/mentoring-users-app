import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersState, foldersFeatureKey } from './materials.reducer-folder'
import { MaterialState, materialsFeatureKey } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectFoldersState = createFeatureSelector<FoldersState>(foldersFeatureKey);
export const selectFolders = createSelector(
    selectFoldersState,
    (state) => {
        return state.folders
     }
)

export const selectRawFolders = createSelector(
  selectFoldersState,
  (state) => state.folders
);

export const selectMaterialState = createFeatureSelector<MaterialState>(materialsFeatureKey);
export const selectMaterial = createSelector(
    selectMaterialState,
    (state) => {
        return state.materials
    }
)

export const selectMaterialsFilter = createSelector(
  selectMaterial,
  selectRouteParams,
  (materials, routeParams) => {
    return materials.filter(material => material.folder_id === +routeParams['id']);
  }
)

