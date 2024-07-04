import { MATERIALS_FEATURE_KEY, materialsSelector } from './materials.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { LoadingStatus, selectRouteParams } from '@users/core/data-access';
import { MaterialEntity } from '../../interfaces/material-entity.interface';


const { selectAll, selectEntities } = materialsSelector.getSelectors();


interface MaterialState extends EntityState<MaterialEntity> {
  status: LoadingStatus;
}

export const selectMaterialsState = createFeatureSelector<MaterialState>(
  MATERIALS_FEATURE_KEY
);

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state) => selectAll(state)
);

export const selectMaterialsStatus = createSelector(
  selectMaterialsState, (state) => state.status
);

export const selectMaterialsEntities = createSelector(
  selectMaterialsState,
  (state) => selectEntities(state)
);

export const selectMaterialsByFolderId = createSelector(
  selectRouteParams,
  selectMaterials,
  ({ id }, entities) =>
    entities.filter((entity) =>
      entity.folderId === Number(id)
    )
);
