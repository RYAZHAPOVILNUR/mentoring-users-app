import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity } from '../../models/materials.entity';
import * as MaterialsActions from './materials.actions';


export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
 [key: string]: unknown;
};

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initMaterials, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) =>
    ({ ...state,
      status: 'error' as const,
      error })));

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
