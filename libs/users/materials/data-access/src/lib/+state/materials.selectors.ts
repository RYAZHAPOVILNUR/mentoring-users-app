import { createFeatureSelector, createSelector } from '@ngrx/store';
import { materialsFeatureKey, MaterialsState, materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(materialsFeatureKey);

const {selectAll, selectEntities} = materialsAdapter.getSelectors()

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state) )

export const selecLoadingStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.loadingStatus)

export const selectError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error)

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => state.materials)

export const selectFoldersEntities = createSelector(selectMaterialsState, (state: MaterialsState) => selectEntities(state))

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, foldersEntities) => foldersEntities[id] || null
)

export const selectFoldersMaterials = createSelector(
  selectAllMaterials,
  selectRouteParams,
  (materials, { id }) =>  materials.filter((material) => Number(material.folder_id) === Number(id) && material.material_link !== 'string')
)
