import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.materialsFeatureKey);

const {selectAll} = fromMaterials.materialsAdapter.getSelectors()

export const selectAllFolders = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => selectAll(state) )

export const selecLoadingStatus = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.loadingStatus)
