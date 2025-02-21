import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { FoldersState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<FoldersState>(fromMaterials.materialsFeatureKey);

export const selectAllFolders = createSelector(selectMaterialsState, (state: FoldersState) => state.folders);