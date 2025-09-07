import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from '@shared/util-store';

import { MATERIAL_FEATURE_KEY, materialsAdapter, materialsFeature, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIAL_FEATURE_KEY);

export const { selectPublishStatus } = materialsFeature;

export const { selectAll: selectAllMaterials, selectEntities: selectMaterialsEntities } =
  materialsAdapter.getSelectors(selectMaterialsState);

export const selectMaterialsByFolderId = createSelector(selectRouteParams, selectAllMaterials, ({ id }, materials) =>
  materials.filter((m) => m.folder_id === +id),
);
