import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MATERIALS_FEATURE_KEY,
  MaterialsState,
  folderAdapter,
  materialAdapter,
} from './materials.reducer';

const { selectAll: selectAllFolders } = folderAdapter.getSelectors();

const { selectAll: selectAllMaterials } = materialAdapter.getSelectors();

export const selectMaterialState = createFeatureSelector<MaterialsState>(
  MATERIALS_FEATURE_KEY
);

export const selectMaterialStatus = createSelector(
  selectMaterialState,
  (state: MaterialsState) => state.status
);

export const selectMaterialError = createSelector(
  selectMaterialState,
  (state: MaterialsState) => state.error
);

export const selectFolders = createSelector(
  selectMaterialState,
  (state: MaterialsState) => selectAllFolders(state.folders)
);

export const selectMaterials = createSelector(
  selectMaterialState,
  (state: MaterialsState) => selectAllMaterials(state.materials)
);
