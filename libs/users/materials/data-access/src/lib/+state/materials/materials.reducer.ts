import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { IMaterial } from '../../models/materials-models';
import * as MaterialsActions from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  error: Error;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<IMaterial> {
  materials: IMaterial[];
  selectedMaterialId?: string | number;
  error: MaterialsErrors | null;
  status: LoadingStatus;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<IMaterial> = createEntityAdapter<IMaterial>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  materials: [],
  error: null,
});

const materialsReducer = createReducer(
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
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.addMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) =>
    materialsAdapter.addOne(material, {
      ...state,
      status: 'loaded' as const,
      error: null,
    })
  ),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'error' as const,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);

export function MaterialsReducer(state: MaterialsState | undefined, action: Action) {
  return materialsReducer(state, action);
}
