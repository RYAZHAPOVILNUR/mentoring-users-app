import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity } from '../../models/materials.interface';
import * as MaterialsActions from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedFolderId?: number;
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
  on(MaterialsActions.loadMaterials, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.addMaterialSuccess, (state, { materialData }) =>
    materialsAdapter.addOne({ ...materialData }, { ...state })
  ),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({ ...state, status: 'error' as const, error }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
