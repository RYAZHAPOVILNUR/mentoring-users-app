import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialDTO } from '../models/material-model';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<MaterialDTO> {
  selectedId?: string | number;
  materials: MaterialDTO[];
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialDTO> = createEntityAdapter<MaterialDTO>();


export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  selectedId: undefined, 
  materials: [],
  status: 'loading',
  error: null, 
});

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => {
    return materialsAdapter.setAll(materials, {
      ...state,
      status: 'loaded' as const,
      error: null,
    });
  }),
  on(MaterialsActions.loadMaterialsFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state) => ({
    ...state,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.deleteMaterialrFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.addMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.addMaterialSuccess, (state) => ({
    ...state,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
