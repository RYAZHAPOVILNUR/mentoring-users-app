import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import { MaterialsType } from '../models/material.type';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsType> {
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export const MaterialsAdapter: EntityAdapter<MaterialsType> = createEntityAdapter<MaterialsType>();

export const initialMaterialsState: MaterialsState = MaterialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

export const MaterialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialActions.initMaterials, (state) => ({
      ...state,
      status: 'init' as const,
    })),
    on(MaterialActions.loadMaterialsSuccess, (state, { materials }) =>
      MaterialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
    ),
    on(MaterialActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialActions.deleteMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialActions.deleteMaterialsSuccess, (state, { id }) =>
      MaterialsAdapter.removeOne(id, { ...state, status: 'loaded' as const })
    ),
    on(MaterialActions.deleteMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialActions.addMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialActions.addMaterialsSuccess, (state, { material }) =>
      MaterialsAdapter.addOne({ ...material }, { ...state, status: 'loaded' as const })
    ),
    on(MaterialActions.addMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
