import {  createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<fromMaterials.initState>(fromMaterials.materialsFeatureKey);
export const selectFolder = createSelector(selectMaterialsState, (state: fromMaterials.initState) => state.folder);
export const selectFolders = createSelector(selectMaterialsState, (state: fromMaterials.initState) => state.folders);
export const selectFolderTitle = createSelector(selectMaterialsState, (state: fromMaterials.initState) => state.folder.title);
export const selectMatStatus = createSelector(selectMaterialsState, (state: fromMaterials.initState) => state.status);
export const selectMats = createSelector(
    selectMaterialsState, 
    selectFolder,
    (state: fromMaterials.initState, folder) => state.mats.filter((item) => item.folder_id === folder.id)
);