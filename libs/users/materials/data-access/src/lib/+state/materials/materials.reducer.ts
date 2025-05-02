import { Action, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from '../materials/materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity } from '../../models-material/materials.entity';

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

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>()

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
})

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducerM(state, action);
}

const reducerM = createReducer(
  
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

  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => 
    materialsAdapter.removeOne(id, { ...state })
  ),

  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialsActions.addMaterialSuccess, (state, { materialData }) => {
    return materialsAdapter.addOne({ ...materialData }, { ...state });
  }),

  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
  
);