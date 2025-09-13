import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { materialActions } from './material.actions';
import { MaterialEntity } from '../types/material-entity.type';

export const MATERIAL_FEATURE_KEY = 'materials';

export interface MaterialState extends EntityState<MaterialEntity> {
  status: LoadingStatus;
}

export const materialAdapter: EntityAdapter<MaterialEntity> = createEntityAdapter<MaterialEntity>();

const initialMaterialsState = materialAdapter.getInitialState({
  status: 'init',
});

export const materialFeature = createFeature({
  name: MATERIAL_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(materialActions.addMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(materialActions.addMaterialSuccess, (state, { material }) =>
      materialAdapter.addOne({ ...material }, { ...state, status: 'loaded' as const }),
    ),
    on(materialActions.adddMaterialFailed, (state) => ({ ...state, status: 'error' as const })),

    on(materialActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(materialActions.loadMaterialsSuccess, (state, { materials }) =>
      materialAdapter.setAll(materials, { ...state, status: 'loaded' as const }),
    ),
    on(materialActions.loadMaterialsFailed, (state) => ({ ...state, status: 'error' as const })),

    on(materialActions.deleteMaterial, (state) => ({ ...state, status: 'loading' as const })),
    on(materialActions.deleteMaterialSuccess, (state, { materialId }) =>
      materialAdapter.removeOne(materialId, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(materialActions.deleteMaterialFailed, (state) => ({ ...state, status: 'error' as const })),
  ),
});
