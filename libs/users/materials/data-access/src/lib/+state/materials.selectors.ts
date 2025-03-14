import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FolderState, MaterialState } from "./materials.reducer";

export const selectFolderState = createFeatureSelector<FolderState>('folders');
export const selectAllFolders = createSelector(selectFolderState, (state: FolderState) => state.folder);
export const selectFoldersError = createSelector(selectFolderState, (state: FolderState) => state.folderError);

export const selectMaterialState = createFeatureSelector<MaterialState>('materials');
export const selectAllMaterials = createSelector(selectMaterialState, (state: MaterialState) => state.materials);
export const selectMaterialError = createSelector(selectMaterialState, (state: MaterialState) => state.MaterialError)