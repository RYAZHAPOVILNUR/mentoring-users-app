import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as foldersSelectors from './../folders/folders.selectors';
import { MATERIALS_FEATURE_KEY, MaterialsState, MaterialsAdapter } from './materials.reducer';
import { TMaterial } from '../../models/material.type';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = MaterialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectOpenedMaterials = createSelector(
  selectAllMaterials,
  foldersSelectors.selectOpenedFolder,
  (materials, folder): TMaterial[] => (folder ? materials.filter((material) => material.folder_id === folder.id) : [])
);
