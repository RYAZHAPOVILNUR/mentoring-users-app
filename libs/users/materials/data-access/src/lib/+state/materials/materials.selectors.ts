import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectOpenedFolder } from '../folders/folders.selectors';
import { MATERIALS_FEATURE_KEY, materialsAdapter, MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectFilteredMaterials = createSelector(
  selectAllMaterials, 
  selectOpenedFolder, 
  (materials, folder) => materials.filter(m => m.folder_id === folder?.id)
);
