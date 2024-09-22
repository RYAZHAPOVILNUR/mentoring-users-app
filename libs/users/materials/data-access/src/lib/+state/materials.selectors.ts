import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, materialsAdapter, materialsFeature, MaterialsState } from './materials.reducer';

export const selectMaterialsState =
  createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();


// folders
export const selectFoldersStatus = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.status
);

export const selectAllFolders = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);

export const selectEntitiesFolders = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectEntities(state)
);

export const selectFoldersError = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.error
);


export const {
  selectError,
  selectStatus,
  selectMaterials,
} = materialsFeature;
