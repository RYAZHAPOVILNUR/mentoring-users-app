import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsFeatureState, MATERIALS_FEATURE_KEY, materialsAdapter } from './materials.reducer';

const { selectEntities } = materialsAdapter.getSelectors();
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

export const selectRevealedFolder = createSelector(
  selectMaterialsFeatureState,
  (state) => state.revealedFolder
);

export const selectMaterialsEntities = createSelector(
  selectMaterialsFeatureState,
  (state: MaterialsFeatureState) => {
    return selectEntities(state)
  }
);

export const selectFilteredMaterials = createSelector(
  selectMaterialsEntities,
  selectRevealedFolder,
  (entities, folder) => {
    return folder
      ? Object.values(entities).filter(material => material?.folder_id === folder.id)
      : []
  }
);
