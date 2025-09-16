import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from '@shared/util-store';

import { MATERIAL_FEATURE_KEY, materialAdapter, materialFeature, MaterialState } from './material.reducer';

export const selectMaterialState = createFeatureSelector<MaterialState>(MATERIAL_FEATURE_KEY);

export const { selectStatus: status } = materialFeature;

export const { selectAll: selectAllMaterials, selectEntities: selectMaterialsEntities } =
  materialAdapter.getSelectors(selectMaterialState);

export const selectFolderMaterials = createSelector(selectRouteParams, selectAllMaterials, ({ id }, materials) =>
  materials.filter((m) => m.folderId === +id),
);
