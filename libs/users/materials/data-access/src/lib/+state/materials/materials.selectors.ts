import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsState, materialsAdapter, materialsFeatureKey } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { Params } from '@angular/router';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(materialsFeatureKey);

const { selectAll } = materialsAdapter.getSelectors();

export const selectAllMaterials = createSelector(
  selectMaterialsState, 
  (state: MaterialsState) => selectAll(state)
);

export const selectMaterialsByFolder = createSelector(
  selectAllMaterials,
  selectRouteParams,
  (allMaterials, { id }: Params) => allMaterials.filter((material) => material.folderId === Number(id))
);

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.status
);

export const selectMaterialsError = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.error
);
