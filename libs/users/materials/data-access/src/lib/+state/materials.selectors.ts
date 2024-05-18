import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter} from './materials.reducer';

// Lookup the 'Materials' feature state managed by NgRx
export const selectMaterialsState = createFeatureSelector<MaterialsState>(
  MATERIALS_FEATURE_KEY
);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectFoldersStatus = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.status
);

export const selectFolderErrors = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.error
);

export const selectFolders = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);

//для работы с селекторами (все энтити)
export const selectFoldersEntities = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectEntities(state)
);

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.materials
);

//для работы с селекторами (все id энтити)
export const selectSelectedId = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectFoldersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
