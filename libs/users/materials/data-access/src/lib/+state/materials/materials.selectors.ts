import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { MaterialType } from '../models/material.type';
import * as foldersSelectors from '../folders/folders.selectors';
import { MaterialsState, materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(
  fromMaterials.MATERIALS_FEATURE_KEY
);

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectOpenedMaterial = createSelector(
  selectAllMaterials,
  foldersSelectors.selectOpenedFolder,
  (materials, folder): MaterialType[] =>
    folder ? materials.filter((material) => material.folder_id === folder.id) : []
);
