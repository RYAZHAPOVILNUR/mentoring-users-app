import { Action, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity } from './materials.types';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  status: LoadingStatus;
  error: Error | null;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialMaterialState,
  on(MaterialsActions.loadMaterials, (state) => state),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.addMaterial, (state) => {
    return {
      ...state,
      status: 'loading' as const,
    };
  }),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => materialsAdapter.addOne({ ...material }, { ...state })),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => {
    return {
      ...state,
      status: 'error' as const,
      error,
    };
  }),
  on(MaterialsActions.deleteMaterial, (state) => {
    return {
      ...state,
      status: 'loading' as const,
    };
  }),
  on(MaterialsActions.deleteMaterialSuccess, (state, { materialId }) => materialsAdapter.removeOne(materialId, { ...state })),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => {
    return {
      ...state,
      status: 'error' as const,
      error,
    };
  })
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
