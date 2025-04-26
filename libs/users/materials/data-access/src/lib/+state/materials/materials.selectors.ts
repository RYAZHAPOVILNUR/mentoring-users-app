import { createSelector } from '@ngrx/store';
import { MaterialsState, materialsAdapter, materialsFeature } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const {
  selectMaterialsState,
  selectIds: selectMaterialsIds,
  selectStatus: selectMaterialStatus,
} = materialsFeature;

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectMaterialSelectedId = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => state.selectedId
);

export const selectMaterialEntity = createSelector(
  selectMaterialsEntities,
  selectMaterialSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectMaterialById = (id: number) => createSelector(selectMaterialsEntities, (entities) => entities[id]);

export const selectOpenedMaterials = createSelector(
  selectRouteParams,
  selectMaterialsEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectMaterialsFilter = createSelector(selectMaterialsState, (state: MaterialsState) => state.materialFilter);

export const selectFilteredMaterials = createSelector(selectMaterialsFilter, selectAllMaterials, (filter, materials) => {
  return filter.folder_id ? materials.filter(material => material.folder_id === filter.folder_id) : materials;
}
)
