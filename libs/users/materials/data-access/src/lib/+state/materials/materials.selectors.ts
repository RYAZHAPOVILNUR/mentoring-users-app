import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMaterialsState, MATERIALS_FEATURE_KEY, materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<IMaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: IMaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: IMaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: IMaterialsState) => selectAll(state));
