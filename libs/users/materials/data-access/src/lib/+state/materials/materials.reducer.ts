import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { MaterialsErrors } from './materials.models';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId?: string | number; // which Materials record has been selected
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

  on(MaterialsActions.initMaterials, (state) => {
    return {
      ...state,
      status: 'loading' as const,
    };
  }),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => {
    return materialsAdapter.setAll(materials, {
      ...state,
      status: 'loaded' as const,
    });
  }),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => {
    return {
      ...state,
      status: 'error' as const,
      error,
    };
  }),
  on(MaterialsActions.addMaterialSuccess, (state, { materialData }) => {
    console.log(materialData);
    return materialsAdapter.addOne({ ...materialData }, { ...state });
  }),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => {
    return materialsAdapter.removeOne(id, {
      ...state,
      status: 'loaded' as const,
    });
  }),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.editMaterialSuccess, (state, { materialData }) =>
    materialsAdapter.updateOne(
      {
        id: materialData.id,
        changes: materialData,
      },
      state
    )
  ),
  on(MaterialsActions.editMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
