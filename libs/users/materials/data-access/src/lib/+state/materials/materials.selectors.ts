import { MATERIALS_FEATURE_KEY, materialsAdapter } from './materials.reducer';
import { MaterialState } from '../../interfaces/material-state.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

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
