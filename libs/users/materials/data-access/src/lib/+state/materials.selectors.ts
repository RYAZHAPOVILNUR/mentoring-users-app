import { createSelector } from '@ngrx/store';
import { MaterialsState, materialsAdapter, materialsFeature } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';


const { selectMaterialsState } = materialsFeature

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectFolders = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
)

export const selectFoldersEntity = createSelector(
  selectMaterialsState, (state: MaterialsState) => selectEntities(state)
)

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntity,
  ({id}, entities) => entities[id] || null
)

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.status
)

export const selectAllMaterials = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.materials
)

export const filteredByIdMaterials = createSelector(
  selectRouteParams,
  selectAllMaterials,
  ({id}, materials) => materials.filter(item => item.folder_id === Number(id))
)