import {  createFeatureSelector, createSelector } from '@ngrx/store';
import { materialsFeatureKey, materialState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<materialState>(materialsFeatureKey)
;
export const selectFolder = createSelector(selectMaterialsState, (state: materialState) => state.folder);

export const selectFolders = createSelector(selectMaterialsState, (state: materialState) => state.folders);

export const selectMatStatus = createSelector(selectMaterialsState, (state: materialState) => state.status);

export const selectMats = createSelector(
    selectMaterialsState, 
    selectFolder,
    (state: materialState, folder) => 
        state.mats.filter((item) => item.folder_id === folder.id
    )
);