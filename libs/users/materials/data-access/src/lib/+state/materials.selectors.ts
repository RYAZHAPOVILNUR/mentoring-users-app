import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialsState>(fromMaterials.MATERIALS_FEATURE_KEY);

export const selectAllFolders = createSelector(selectMaterialsState, (state: fromMaterials.MaterialsState) => state.folders)