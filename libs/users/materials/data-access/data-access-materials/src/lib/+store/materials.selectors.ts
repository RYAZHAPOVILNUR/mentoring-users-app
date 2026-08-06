import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParam } from '@shared/util-store';

import { MATERIALS_FEATURE_KEY, MaterialsState } from './materials.reducer';

const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const selectCurrentMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectGetMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => state.materials);

export const selectMaterialsLoadingStatus = createSelector(
  selectCurrentMaterialsStatus,
  (status: string) => status === 'loading',
);

export const selectFilteredMaterials = createSelector(selectGetMaterials, selectRouteParam('id'), (materials, id) =>
  Number(id) ? materials.filter((material) => material.folder_id === Number(id)) : [],
);
