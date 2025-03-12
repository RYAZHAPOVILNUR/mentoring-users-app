import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import { MaterialDTO } from '../../models/materials.models';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialDTO> {
  error: MaterialsErrors | null;
  status: LoadingStatus;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export const materialsAdapter: EntityAdapter<MaterialDTO> = createEntityAdapter<MaterialDTO>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => materialsAdapter.addOne({ ...material }, { ...state })),

);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
