import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<fromMaterials.MaterialState>(fromMaterials.materialsFeatureKey);

export const selectAllFolders = createSelector(selectMaterialsState, state => state.folders);
export const selectAllMaterials = createSelector(selectMaterialsState, state => state.materials);

export const selectOpenedFolder = createSelector(
    selectRouteParams,
    selectAllFolders,
    ({id}, folders) => folders.find(folder => folder.id === +id ) || null
)