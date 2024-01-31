import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = 
  createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = fromMaterials.materialsAdapter.getSelectors();

//folders
export const selectFoldersEntities = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => selectAll(state)
); 
export const selectFoldersStatus = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => state.status
);
export const selectFoldersError = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => state.error
);


//Materials
export const selectMaterialsEntities = createSelector(
  selectRouteParams, 
  selectMaterialsState,
  ({id}, state: fromMaterials.MaterialsState) => {
    return !isNaN(id)? state.materials.filter((material)=> material.folder_id === Number(id)): [];
  } 
); 

export const selectMaterialsStatus = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => state.status
);

export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state: fromMaterials.MaterialsState) => state.error
);