import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { materialsAdapter, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(
  fromMaterials.materialsFeatureKey
);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);
