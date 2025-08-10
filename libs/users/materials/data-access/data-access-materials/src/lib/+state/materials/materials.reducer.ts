import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { materialsActions } from './materials.actions';
import { Material } from '../../interfaces/create-material.interface';

export const MATERIAL_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Material> {
  status: LoadingStatus;
  publishStatus: LoadingStatus;
  materials: Material[];
}

export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>({
  sortComparer: (a, b) => {
    return Number(a.created_at) - Number(b.created_at);
  },
});

const initialMaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  publishStatus: 'init',
  materials: [] as Material[],
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
      status: 'loading' as const,
    })),
    on(materialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials: [...materials],
      status: 'loaded' as const,
    })),
    on(materialsActions.loadMaterialsFailed, (state) => ({ ...state, publishStatus: 'error' as const })),

    on(materialsActions.deleteMaterial, (state) => ({ ...state, publishStatus: 'loading' as const })),
    on(materialsActions.deleteMaterialSuccess, (state, { material_id }) =>
      materialsAdapter.removeOne(material_id, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(materialsActions.deleteMaterialFailed, (state) => ({ ...state, status: 'error' as const })),
  ),
});
