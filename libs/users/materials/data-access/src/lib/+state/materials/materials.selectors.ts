import { MATERIALS_FEATURE_KEY, materialsAdapter } from './materials.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { MaterialDTO } from '../../interfaces/material-dto.interface';
import { LoadingStatus, selectRouteParams } from '@users/core/data-access';


const { selectAll, selectEntities } = materialsAdapter.getSelectors();

//const folderId: number | undefined = Number(this.activatedRoute.snapshot.params['id']);


interface MaterialState extends EntityState<MaterialDTO> {
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
      entity.folder_id === Number(id)
    )
);
