import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { LoadingStatus, MaterialEntity } from '@users/core/data-access';
import { UserMaterialActions } from './user-material.actions';

export const USER_MATERIALS_FEATURE_KEY = 'user-materials';

export type MaterialError = {
  status: number;
  [key: string]: unknown;
}

export interface MaterialState extends EntityState<MaterialEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: MaterialError | null;
}

export interface FoldersPartialState {
  readonly [USER_MATERIALS_FEATURE_KEY]: MaterialState;
}

export const materialsAdapter: EntityAdapter<MaterialEntity> = createEntityAdapter<MaterialEntity>();

export const initialMaterialsState: MaterialState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialMaterialsState,
  on(UserMaterialActions.initMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UserMaterialActions.loadMaterialsSuccess, (state, {materials}) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(UserMaterialActions.loadMaterialsFailure, (state, {error}) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UserMaterialActions.editMaterialSuccess, (state, { materialData }) =>
    materialsAdapter.updateOne(
      {
        id: materialData.id,
        changes: materialData,
      },
      state
    )
  ),
  on(UserMaterialActions.editMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UserMaterialActions.deleteMaterialSuccess, (state, {id}) => materialsAdapter.removeOne(id, {...state})),
  on(UserMaterialActions.deleteMaterialFailure, (state, {error}) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UserMaterialActions.addMaterialSuccess, (state, {materialData}) => materialsAdapter.addOne({...materialData}, {...state})),
);

export function userMaterialsReducer(state: MaterialState| undefined, action: Action){
  return reducer(state, action);
};
