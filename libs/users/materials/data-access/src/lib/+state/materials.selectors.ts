import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsFeatureState, materialAdapter } from './materials.reducer';
import { selectRouteParam, selectRouteParams } from '@users/core/data-access';

export const selectMaterialsFeatureState =
    createFeatureSelector<MaterialsFeatureState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialAdapter.getSelectors();

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
    (state) => selectAll(state)
);

export const selectMaterials = createSelector(
    selectMaterialsFeatureState,
    (state) => state.materials
);

export const selectFoldersEntities = createSelector(
    selectMaterialsFeatureState,
    (state) => selectEntities(state)
)

export const selectOpenedFolder = createSelector(
    selectRouteParams,
    selectFoldersEntities,
    ({ id }, entities) => entities[id] || null
);

export const selectFolderMaterials = createSelector(
    selectMaterialsFeatureState,
    selectOpenedFolder,
    (state, folder) => {
        return state.materials.filter(material => material.folder_id === folder?.id)
    }
)
