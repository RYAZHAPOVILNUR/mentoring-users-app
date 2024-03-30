import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsFeatureState, MATERIALS_FEATURE_KEY, materialsAdapter, foldersAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsFeatureState = createFeatureSelector<MaterialsFeatureState>(MATERIALS_FEATURE_KEY);

const { selectAll: selectAllFolders } = foldersAdapter.getSelectors();
const { selectAll: selectAllMaterials } = materialsAdapter.getSelectors();

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
  (state) => selectAllFolders(state.folders)
);

export const selectMaterials = createSelector(
  selectMaterialsFeatureState,
  (state) => selectAllMaterials(state.materials)
)

export const selectOpenedFolder = createSelector(
  selectFolders,
  selectRouteParams,
  (folders, params) =>
    folders.find(folder => folder.id === Number(params['id']))
)
