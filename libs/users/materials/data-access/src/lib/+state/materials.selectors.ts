import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.MATERIALS_FEATURE_KEY);

const { selectAll } = fromMaterials.materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.status)

export const selectMaterialsError = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.error)

export const selectAllFolders = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => selectAll(state))
