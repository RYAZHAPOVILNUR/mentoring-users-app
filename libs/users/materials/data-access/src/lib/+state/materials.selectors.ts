import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsState } from './materials.reducer';

export const selectMaterialsState = createFeatureSelector<MaterialsState>('materials');

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.materials
);
export const selectMaterialsStatus = createSelector(selectMaterialsState, (state : MaterialsState) => state.status)
export const selectMaterialsByFolderId = (folderId: number) =>
  createSelector(selectMaterials, (materials) =>
    materials.filter((material: { folder_id: number }) => material.folder_id === folderId)
  );
