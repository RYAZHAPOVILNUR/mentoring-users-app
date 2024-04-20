import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsState, materialsAdapter, MATERIALS_FEATURE_KEY } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

// export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.materialsFeatureKey);
export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectFoldersStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllFolders = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectFoldersEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({ id }, entities) => entities[id] || null
);


export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectAllMaterials = createSelector(
 selectMaterialsState,  
   (state: MaterialsState) => state.material
)


