import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectCombinedState = createFeatureSelector<fromMaterials.combinedState>(
  fromMaterials.materialsFeatureKey
);

const {
  selectAll: selectAllFolders,
  selectEntities: selectFolderEntities
} = fromMaterials.folderAdapter.getSelectors()
const {
  selectAll: selectAllMaterials,
  selectEntities: selectMaterialEntities
} = fromMaterials.materialAdapter.getSelectors()

export const selectAllFolder = createSelector(
  selectCombinedState,
  (state: fromMaterials.combinedState) => selectAllFolders(state.folderFeature)
)

export const selectFolderStatus = createSelector(
  selectCombinedState,
  (state: fromMaterials.combinedState) => state.folderFeature.status
)

export const selectMaterialStatus = createSelector(
  selectCombinedState,
  (state: fromMaterials.combinedState) => state.materialFeature.status
)

export const selectAllMaterial = createSelector(
  selectCombinedState,
  (state: fromMaterials.combinedState) => selectAllMaterials(state.materialFeature)
)