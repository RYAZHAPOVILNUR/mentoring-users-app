import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MATERIALS_FEATURE_KEY,
  MaterialsState,
  materialsAdapter,
} from './materials.reducer';

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectFoldersState = createFeatureSelector<MaterialsState>(
  MATERIALS_FEATURE_KEY
);

export const selectMaterials = createSelector(
  selectFoldersState,
  (state: MaterialsState) => selectAll(state)
);

export const selectMaterialsEntities = createSelector(
  selectFoldersState,
  (state: MaterialsState) => selectEntities(state)
);

export const selectMaterialsStatus = createSelector(
  selectFoldersState,
  (state: MaterialsState) => state.status
);

export const selectMaterialsError = createSelector(
  selectFoldersState,
  (state: MaterialsState) => state.error
);

export const selectMaterialsMaterials = createSelector(
  selectFoldersState,
  (state: MaterialsState) => state.materials
);

export const selectMaterialsOpenedFolder = createSelector(
  selectFoldersState,
  (state: MaterialsState) => state.openedFolder
);
