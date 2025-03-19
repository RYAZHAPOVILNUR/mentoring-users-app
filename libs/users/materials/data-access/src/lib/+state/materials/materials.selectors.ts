import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { DeepReadonlyArray } from '@users/core/utils';
import { MaterialsEntity } from '../../models/materials.entity';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';

// Lookup the 'Materials' feature state managed by NgRx
export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectMaterialsForOpenedFolder = createSelector(
  selectRouteParams,
  selectAllMaterials,
  ({ folderId }, allMaterials) => {
    const paramsFolderId = Number(folderId);
    if (Number.isNaN(paramsFolderId)) {
      return [] as DeepReadonlyArray<MaterialsEntity>;
    }
    return allMaterials.filter(({ folderId }) =>
      folderId === paramsFolderId) as DeepReadonlyArray<MaterialsEntity>;
  }
);

export const selectSelectedId = createSelector(selectMaterialsState,
  (state: MaterialsState) => state.selectedId);

export const selectEntity = createSelector(selectMaterialsEntities, selectSelectedId,
  (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
