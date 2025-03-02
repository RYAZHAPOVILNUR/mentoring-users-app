import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersFeatureKey, FoldersState } from '../folders/folders.reducer';
import { materialsAdapter, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(FoldersFeatureKey);

const { selectAll } = materialsAdapter.getSelectors();


export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);
