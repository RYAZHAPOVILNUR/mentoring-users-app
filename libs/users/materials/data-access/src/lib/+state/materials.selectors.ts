import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsFeatureState } from './materials.reducer';

export const selectMaterialsFeatureState =
    createFeatureSelector<MaterialsFeatureState>(MATERIALS_FEATURE_KEY);

export const selectMaterialsFeatureStatus = createSelector(
    selectMaterialsFeatureState,
    (state) => state.status
);

export const selectMaterialsFeatureError = createSelector(
    selectMaterialsFeatureState,
    (state) => state.error
);

export const selectFolders = createSelector(
    selectMaterialsFeatureState,
    (state) => state.folders
);

export const selectMaterials = createSelector(
    selectMaterialsFeatureState,
    (state) => state.materials
);

export const selectOpenedFolder = createSelector(
    selectMaterialsFeatureState,
    (state) => state.openedFolder
);

export const selectFolderMaterials = createSelector(
    selectMaterialsFeatureState,
    selectOpenedFolder,
    (state, folder) => {
        return state.materials.filter(material => material.folder_id === folder?.id)
    }
)
