import { MaterialDTO } from '../models/material.model';
import { createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';

export const materialsFeatureKey = 'materials';

export interface MaterialsState {
  materials: MaterialDTO[];
  status: LoadingStatus;
  error?: Error | null;
}

export const materialInitialState: MaterialsState = {
  materials: [],
  status: 'init',
  error: null,
};

export const materialsReducer = createReducer(
  materialInitialState,
  on(MaterialsActions.loadMaterials, (state) => ({ ...state, status: 'loading' })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    status: 'loaded',
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
