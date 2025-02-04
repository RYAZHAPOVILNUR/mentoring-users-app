import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TMaterialDTO } from '../../models/materials/material-dto.model';
import { LoadingStatus } from '@users/core/data-access';
import { TMaterialError } from '../../models/materials/material-error.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface IMaterialsState extends EntityState<TMaterialDTO> {
  status: LoadingStatus;
  error: TMaterialError | null;
}

export interface IMaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: IMaterialsState;
}

export const materialsAdapter: EntityAdapter<TMaterialDTO> = createEntityAdapter<TMaterialDTO>();

export const initialMaterialsState: IMaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded' as const,
      })
    ),
    on(MaterialsActions.loadMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.deleteMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.deleteMaterialsSuccess, (state, { id }) => {
      return materialsAdapter.removeOne(id, { ...state, status: 'loaded' as const });
    }),
    on(MaterialsActions.deleteMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
