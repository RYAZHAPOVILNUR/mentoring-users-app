import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  foldersAdapter,
  MATERIALS_FEATURE_KEY,
  materialsAdapter,
  MaterialsState
} from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { EntityState } from '@ngrx/entity';

export const selectFeatureState =
  createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll: selectAllFolder, selectEntities: selectEntitiesFolder } = foldersAdapter.getSelectors();
const { selectAll: selectAllMaterial } = materialsAdapter.getSelectors();

// Начальное состояние
export const selectFoldersState = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.folders
);
export const selectMaterialsSubState = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.materials
);

// folders
export const selectAllFolders = createSelector(
  selectFoldersState,
  selectAllFolder
);

export const selectFoldersStatus = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.folders.status
);

export const selectFoldersError = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.folders.error
);

export const selectFoldersEntities = createSelector(
  selectFoldersState,
  selectEntitiesFolder
)

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] || null
)

// Materials
export const selectAllMaterials = createSelector(
  selectMaterialsSubState,
  selectAllMaterial
);

export const filteredMaterials = createSelector(
  selectAllMaterials, selectRouteParams,
  (materials,
   { id }) => materials.filter(material => material.folder_id === Number(id))
);

export const selectMaterialsStatus = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.materials.status
);

export const selectMaterialsErrors = createSelector(
  selectFeatureState,
  (state: MaterialsState) => state.materials.error
);
