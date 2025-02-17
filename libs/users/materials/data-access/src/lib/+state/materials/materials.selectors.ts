import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectEntities, selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.status
);

export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.error
);

export const selectAllМaterials = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
);

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectMaterialsByFolderId = (folderId: number) =>
  createSelector(selectAllМaterials, (materials) =>
    materials.filter((material) => material.folder_id === folderId)
  );

  export const selectSelectedIdfromMaterials = createSelector(
    selectMaterialsState,
    (state: MaterialsState) => state.selectedId
  );
  
