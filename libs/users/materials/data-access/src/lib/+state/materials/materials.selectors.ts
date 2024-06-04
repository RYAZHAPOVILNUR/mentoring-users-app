import { MATERIALS_FEATURE_KEY, materialsAdapter } from './materials.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Material } from '../../interfaces/material.interface';
import { LoadingStatus } from '@users/core/data-access';

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

interface MaterialState extends EntityState<Material> {
  status: LoadingStatus;
}

export const selectMaterialsState = createFeatureSelector<MaterialState>(
  MATERIALS_FEATURE_KEY
);

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state) => selectAll(state)
);

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, (state) => state.status
);

export const selectMaterialsEntities = createSelector(
  selectMaterialsState,
  (state) => selectEntities(state)
);
