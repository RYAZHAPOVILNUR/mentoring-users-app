import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@shared/util-store';

import { materialsActions } from './materials.actions';
import { Material } from '../interfaces/material.interface';

export const MATERIAL_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Material> {
  publishStatus: LoadingStatus;
}

export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

const initialMaterialsState = materialsAdapter.getInitialState({
  publishStatus: 'init',
});

export const materialsFeature = createFeature({
  name: MATERIAL_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(materialsActions.publishMaterial, (state) => ({
      ...state,
      publishStatus: 'loading' as const,
    })),
    on(materialsActions.publishMaterialSuccess, (state, { material }) =>
      materialsAdapter.addOne({ ...material }, { ...state, publishStatus: 'loaded' as const }),
    ),
    on(materialsActions.publishMaterialFailed, (state) => ({ ...state, publishStatus: 'error' as const })),

    on(materialsActions.loadMaterials, (state) => ({
      ...state,
      publishStatus: 'loading' as const,
    })),
    on(materialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, { ...state, publishStatus: 'loaded' as const }),
    ),
    on(materialsActions.loadMaterialsFailed, (state) => ({ ...state, publishStatus: 'error' as const })),

    on(materialsActions.deleteMaterial, (state) => ({ ...state, publishStatus: 'loading' as const })),
    on(materialsActions.deleteMaterialSuccess, (state, { materialId }) =>
      materialsAdapter.removeOne(materialId, {
        ...state,
        publishStatus: 'loaded' as const,
      }),
    ),
    on(materialsActions.deleteMaterialFailed, (state) => ({ ...state, publishStatus: 'error' as const })),
  ),
});
