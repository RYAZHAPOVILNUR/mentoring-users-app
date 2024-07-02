import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.MATERIALS_FEATURE_KEY);

const {selectAll} = materialsAdapter.getSelectors();

export const selectAllFolders = createSelector(
  selectMaterialsState, state => selectAll(state),
);

export const selectStatus = createSelector(
  selectMaterialsState, state => state.status
);
