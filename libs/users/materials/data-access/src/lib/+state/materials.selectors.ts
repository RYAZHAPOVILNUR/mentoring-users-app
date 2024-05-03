import {  createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.initState>(fromMaterials.materialsFeatureKey);
export const selectFolders = createSelector(selectMaterialsState, (state: fromMaterials.initState) => state.folders)
