import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsState, materialsFeatureKey, materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(materialsFeatureKey);

const {selectAll , selectEntities} = materialsAdapter.getSelectors();


export  const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);
export const selectAllFolders = createSelector(selectMaterialsState, (state) => selectAll(state));

export  const selectFoldersEntities = createSelector(
  selectMaterialsState, (state: MaterialsState) => selectEntities(state),
)

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => state.materials);
export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] || null
)
