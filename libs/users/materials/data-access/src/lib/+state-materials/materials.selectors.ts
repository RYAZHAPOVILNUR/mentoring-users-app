import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsAdapter, MaterialsState } from './materials.reducer';
import * as foldersSelectors from './../+state-folders/folders.selectors';
import { MaterialsType } from "libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager";

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = MaterialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) => selectEntities(state));

export const selectOpenedMaterials = createSelector(
  selectAllMaterials,
  foldersSelectors.selectOpenedFolder,
  (materials, folder): MaterialsType[] =>
    folder ? materials.filter((material) => material.folder_id === folder.id) : []
);