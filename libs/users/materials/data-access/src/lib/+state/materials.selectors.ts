import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsFeatureState, MATERIALS_FEATURE_KEY } from './materials.reducer';
export const selectMaterialsFeatureState = createFeatureSelector<MaterialsFeatureState>(MATERIALS_FEATURE_KEY);

export const selectMaterialsFeatureStatus = createSelector(
  selectMaterialsFeatureState,
  (state) => state.status
);

export const selectMaterialsFeatureError = createSelector(
  selectMaterialsFeatureState,
  state => state.error
);
export const selectFolders = createSelector(
  selectMaterialsFeatureState,
  (state) => state.folders
);

export const selectMaterials = createSelector(
  selectMaterialsFeatureState,
  (state) => state.materials
)

export const selectRevealedFolder = createSelector(
  selectMaterialsFeatureState,
  (state) => state.revealedFolder
)

export const selectFolderMaterials = createSelector(
  selectMaterialsFeatureState,
  selectRevealedFolder,
  (state, folder) => {
    return state.materials.filter(material => material.folder_id === folder!.id)
  }
)
