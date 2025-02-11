import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './materials.reducer';


export const selectFoldersState = createFeatureSelector<State>('folders');

export const selectAllFolders = createSelector(selectFoldersState, (state: State) => state.folders);
export const selectFoldersError = createSelector(selectFoldersState, (state: State) => state.error);

