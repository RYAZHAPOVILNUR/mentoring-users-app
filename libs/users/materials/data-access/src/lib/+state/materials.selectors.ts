import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as materialsReducers from './materials.reducer';
import { Folder } from '../models/folders.interface';
import { Material } from '../models/materials.interface';

export const selectMaterialsState = createFeatureSelector<materialsReducers.MaterialsState>(materialsReducers.MATERIALS_FEATURE_KEY);

export const selectFolders = createSelector(
  selectMaterialsState,
  (state): Folder[] => state.folders
);

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state): Material[] => state.materials
);