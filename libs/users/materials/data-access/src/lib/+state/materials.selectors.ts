import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsFeatureState, MATERIALS_FEATURE_KEY } from './materials.reducer';
import { selectRouteParams } from '../../../../../../core/data-access/src';

export const selectMaterialsFeatureState = createFeatureSelector<MaterialsFeatureState>(MATERIALS_FEATURE_KEY);

export const selectMaterialsFeatureStatus = createSelector(
  selectMaterialsFeatureState,
  (state) => state.status
);

export const selectMaterialsFeatureError = createSelector(
  selectMaterialsFeatureState,
  state => state.error
);
export const selectFolders = createSelector(
  selectMaterialsFeatureState,
  (state) => state.folders
);

export const selectMaterials = createSelector(
  selectMaterialsFeatureState,
  (state) => state.materials
)

export const selectOpenedFolder = createSelector(
  selectFolders,
  selectRouteParams,
  (folders, params) =>
    folders.find(folder => folder.id === Number(params['id']))
)
