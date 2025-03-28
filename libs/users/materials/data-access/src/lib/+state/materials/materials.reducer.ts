import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { TMaterial } from '../../models/material.type';
import { LoadingStatus } from '@users/core/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<TMaterial> {
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export type MaterialsErrors = {
  status: number;
  message: string;
  [key: string]: unknown;
};

export const MaterialsAdapter: EntityAdapter<TMaterial> = createEntityAdapter<TMaterial>();

export const initialMaterialsState: MaterialsState = MaterialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
      MaterialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadMaterialsFailure, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(MaterialsActions.deleteMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
      MaterialsAdapter.removeOne(id, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.deleteMaterialFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(MaterialsActions.addMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.addMaterialSuccess, (state, { materials }) =>
      MaterialsAdapter.addOne({ ...materials }, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.addMaterialFailed, (state) => ({
      ...state,
      status: 'error' as const,
    }))
  ),
});
