import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsAdapter, MaterialsState } from './materials.reducer';
import * as foldersSelectors from '../folders.selectors'
import { IMaterial } from '../models/material.model';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll } = MaterialsAdapter.getSelectors();

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectOpenedMaterials = createSelector(
  selectAllMaterials,
  foldersSelectors.selectOpenedFolder,
  (materials, folder): IMaterial[] => (folder ? materials.filter((material) => material.folder_id ===
  folder.id): [])
);

