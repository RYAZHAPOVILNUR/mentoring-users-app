import { createFeatureSelector, createSelector } from '@ngrx/store';
import { materialsAdapter, MaterialsFeatureKey, MaterialsState } from './materials.reducer';
import { selectRouteParams } from '../../../../../../../core/data-access/src';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MaterialsFeatureKey);

const { selectAll } = materialsAdapter.getSelectors();


export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

