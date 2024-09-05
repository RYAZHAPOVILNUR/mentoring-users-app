import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, materialsAdapter, MaterialsState } from './materials.reducer';
import { selectOpenedFolder } from '../folders/folders.selectors';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

// export const selectCurrentMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectCurrentMaterials = createSelector(
    selectAllMaterials,
    selectOpenedFolder,
    (materials) => materials
);
