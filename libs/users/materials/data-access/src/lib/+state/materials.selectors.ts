import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const { selectEntities, selectAll } = fromMaterials.materialsAdapter.getSelectors();

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.MATERIALS_FEATURE_KEY);

export const selectAllFolders = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => selectAll(state))

export const selectFodlersEntities = createSelector(
    selectMaterialsState, (state: fromMaterials.MaterialsState) => selectEntities(state)
)

export const selectOpenedFolder = createSelector(
    selectRouteParams, 
    selectFodlersEntities,
    ({id}, entities) => entities[id] || null
)

export const selectAllMaterials = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.materials)