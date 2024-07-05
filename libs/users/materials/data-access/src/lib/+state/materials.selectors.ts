import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { Material } from '../models/material.model';

export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.MATERIALS_FEATURE_KEY);

const {selectAll, selectEntities} = materialsAdapter.getSelectors();

export const selectAllFolders = createSelector(
  selectMaterialsState, state => selectAll(state)
);

export const selectStatus = createSelector(
  selectMaterialsState, state => state.status
);

export const selectAllMaterials = createSelector(
  selectMaterialsState, state => state.materials
);

export const selectFoldersEntities = createSelector(
  selectMaterialsState, state => selectEntities(state)
);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] ?? null
);

export const selectMaterials = createSelector(
  selectAllMaterials,
  selectOpenedFolder,
  (materials, folder): Material[] => folder ? materials.filter((material) => material.folder_id === folder.id) : []
)
