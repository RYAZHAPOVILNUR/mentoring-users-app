import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectMaterialsState = createSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectmaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.errors);
