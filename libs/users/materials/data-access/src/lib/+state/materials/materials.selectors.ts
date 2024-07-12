import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { materialsAdapter } from './materials.reducer';
import { Material } from '../../models/material.model';
import * as foldersSelectors from '../folders/folders.selectors';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.MATERIALS_FEATURE_KEY);

const {selectAll} = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, state => state.status
);

export const selectAllMaterials = createSelector(
  selectMaterialsState, state => selectAll(state)
);

export const selectMaterials = createSelector(
  selectAllMaterials,
  foldersSelectors.selectOpenedFolder,
  (materials, folder): Material[] => folder
    ? materials.filter((material) => material.folder_id === folder.id)
    : []
)
