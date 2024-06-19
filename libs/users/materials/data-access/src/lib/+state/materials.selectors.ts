import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MaterialsStateInterface } from "./types/materials-state.interface";

export const MATERIALS_FEATURE_KEY = 'materials';
export const selectMaterialsState = createFeatureSelector<MaterialsStateInterface>(MATERIALS_FEATURE_KEY);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsStateInterface) => state.materials);
export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsStateInterface) => state.folders);
export const selectStatus = createSelector(selectMaterialsState, (state: MaterialsStateInterface) => state.status);

