import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialState, State } from './materials.reducer';

export const selectFoldersState = createFeatureSelector<State>('folders');
export const selectAllFolders = createSelector(selectFoldersState, (state: State) => state.folders);
export const selectFoldersError = createSelector(selectFoldersState, (state: State) => state.error);

export const selectMaterialsState = createFeatureSelector<MaterialState>('materials')
export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialState) => state.materialsFolders)
export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialState) => state.materialError)
