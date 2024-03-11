import { createSelector } from '@ngrx/store';
import { MaterialsState, materialsAdapter, materialsFeature } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';


const { selectMaterialsState, selectEntities } = materialsFeature

const { selectAll } = materialsAdapter.getSelectors();

export const selectFolders = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
)

export const selectFoldersEntity = createSelector(
  selectMaterialsState, (state:MaterialsState) => selectEntities(state)
)

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntity,
  ({id}, entities) => entities[id] || null
)