import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { MaterialDTO } from '../models/interfaces';

export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.materialsFeatureKey);

export const selectFolders = createSelector(selectMaterialsState, (state) => state.folders)

export const selectFiles = createSelector(selectMaterialsState, (state) => state.files)

export const selectStatus = createSelector(selectMaterialsState, (state) => state.status)

export const selectOpenedMaterial = createSelector(
  selectRouteParams,
  selectFiles,
  (id: any, files: MaterialDTO[]) => {
    return files.filter((material: MaterialDTO) => material.folder_id === +id.id)
  }
);
